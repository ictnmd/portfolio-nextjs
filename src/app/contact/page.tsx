import { Contact } from '@/components/pages/Contact';
import { Sidebar } from '@/components/Sidebar';
import { personalInfo } from '@/data/personalInfo';

// Sample data - in a real app, this would come from a CMS or API


export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background-primary">
      <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar {...personalInfo} />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Contact 
              email={personalInfo.email} 
              socialLinks={personalInfo.socialLinks} 
            />
          </div>
        </div>
      </div>
    </main>
  );
}
