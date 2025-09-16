'use client';

import { useState, useMemo } from 'react';
import { Send, Mail, Facebook, Instagram, RefreshCw } from 'lucide-react';

interface ContactProps {
  email: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
}

export function Contact({ email, socialLinks }: ContactProps) {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [correctCaptchaAnswer, setCorrectCaptchaAnswer] = useState(0);

  // Generate simple math captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = Math.random() > 0.5 ? '+' : '-';
    let question = '';
    let answer = 0;
    
    if (operation === '+') {
      question = `${num1} + ${num2}`;
      answer = num1 + num2;
    } else {
      // Ensure positive result for subtraction
      const larger = Math.max(num1, num2);
      const smaller = Math.min(num1, num2);
      question = `${larger} - ${smaller}`;
      answer = larger - smaller;
    }
    
    setCaptchaQuestion(question);
    setCorrectCaptchaAnswer(answer);
    return answer;
  };

  // Generate initial captcha
  useMemo(() => {
    generateCaptcha();
  }, []);

  // Validation functions
  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'fullname':
        if (!value.trim()) {
          error = 'Full name is required';
        } else if (value.trim().length < 2) {
          error = 'Full name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = 'Full name can only contain letters and spaces';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters';
        } else if (value.trim().length > 500) {
          error = 'Message must be less than 500 characters';
        }
        break;
    }
    
    return error;
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key] = error;
      }
    });
    
    // Validate captcha
    if (!captchaAnswer.trim()) {
      newErrors.captcha = 'Please solve the captcha';
    } else if (parseInt(captchaAnswer) !== correctCaptchaAnswer) {
      newErrors.captcha = 'Incorrect answer. Please try again.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Reset form on success
        setFormData({ fullname: '', email: '', message: '' });
        setCaptchaAnswer('');
        setErrors({});
        generateCaptcha(); // Generate new captcha
        
        // Show success message
        alert('Message sent successfully! I\'ll get back to you soon.');
      } else {
        // Show error message
        alert(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaptchaAnswer(e.target.value);
    if (errors.captcha) {
      setErrors(prev => ({
        ...prev,
        captcha: ''
      }));
    }
  };

  const isFormValid = formData.fullname && formData.email && formData.message && captchaAnswer && parseInt(captchaAnswer) === correctCaptchaAnswer;

  return (
    <article className="bg-background-secondary border border-border rounded-xl p-6 shadow-md">
      <header className="mb-6">
          <h1 className="text-2xl font-semibold text-text-secondary mb-2">Contact</h1>
        <div className="w-8 h-1 bg-gradient-primary rounded"></div>
      </header>


      {/* Contact Form */}
      <section>
        <h3 className="text-lg font-medium text-text-secondary mb-5">Contact Form</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="fullname"
                placeholder="Full name"
                value={formData.fullname}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 bg-background-tertiary border rounded-lg text-text-secondary placeholder-text-muted focus:outline-none transition-colors ${
                  errors.fullname ? 'border-red-500' : 'border-border focus:border-primary'
                }`}
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 bg-background-tertiary border rounded-lg text-text-secondary placeholder-text-muted focus:outline-none transition-colors ${
                  errors.email ? 'border-red-500' : 'border-border focus:border-primary'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          
          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className={`w-full px-4 py-3 bg-background-tertiary border rounded-lg text-text-secondary placeholder-text-muted focus:outline-none transition-colors resize-vertical ${
                errors.message ? 'border-red-500' : 'border-border focus:border-primary'
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
            <div className="text-right text-text-muted text-sm mt-1">
              {formData.message.length}/500 characters
            </div>
          </div>

          {/* Captcha */}
          <div className="flex items-center gap-4 p-4 bg-background-tertiary rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <span className="text-text-secondary font-medium">Solve: {captchaQuestion} =</span>
              <input
                type="number"
                value={captchaAnswer}
                onChange={handleCaptchaChange}
                placeholder="?"
                className={`w-20 px-3 py-2 bg-background-secondary border rounded-lg text-text-secondary focus:outline-none transition-colors ${
                  errors.captcha ? 'border-red-500' : 'border-border focus:border-primary'
                }`}
              />
              <button
                type="button"
                onClick={() => generateCaptcha()}
                className="p-2 text-primary hover:text-primary/80 transition-colors"
                title="Generate new captcha"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
          {errors.captcha && (
            <p className="text-red-500 text-sm">{errors.captcha}</p>
          )}
          
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full md:w-auto md:ml-auto bg-gradient-primary text-primary px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity border border-border"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-background-primary border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>  
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-8 flex flex-row items-center justify-center gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 bg-background-tertiary rounded-lg">
            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-background-tertiary rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-text-muted text-sm">Email</p>
                <a href={`mailto:${email}`} className="text-text-secondary hover:text-primary transition-colors">
                  {email}
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-6">
              {socialLinks.facebook && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-background-tertiary rounded-lg flex items-center justify-center">
                    <Facebook className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Facebook</p>
                    <a 
                      href={socialLinks.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-primary transition-colors"
                    >
                      @ictnmd
                    </a>
                  </div>
                </div>
              )}
              
              {socialLinks.instagram && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-background-tertiary rounded-lg flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Instagram</p>
                    <a 
                      href={socialLinks.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-primary transition-colors"
                    >
                      @ictnmd
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
