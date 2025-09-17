import dynamic from 'next/dynamic';
import { personalInfo } from '@/data/personalInfo';

// Dynamically import components to reduce initial bundle size
const About = dynamic(() => import('@/components/pages/About').then(mod => ({ default: mod.About })), {
  loading: () => <div className="animate-pulse bg-background-secondary rounded-xl p-6 h-96" />
});

const Sidebar = dynamic(() => import('@/components/Sidebar').then(mod => ({ default: mod.Sidebar })), {
  loading: () => <div className="animate-pulse bg-background-secondary rounded-xl p-6 h-96" />
});

// Sample data - in a real app, this would come from a CMS or API
const aboutData = {
  aboutText: [
    "I’m a 25-year-old Software Engineer with over a decade of experience, starting my journey in 2010 by self-learning PHP and WordPress to build websites for local businesses. Recognized with provincial and national awards in science and engineering during high school, I was directly admitted to the National University, where I advanced into professional software development. ",
    "Skilled in Fullstack web development, Android native apps, business analysis, SEO, automation, IoT, CI/CD, and server management, I’m dedicated to leveraging new technologies to optimize efficiency, cut development costs, and deliver impactful solutions for businesses."
  ],
  highlightText: "Engineer at heart, innovator by practice — always exploring new tech to create real-world value.",
  services: [
    {
      icon: 'Code2',
      title: 'Fullstack Web Development',
      description: 'Building modern, high-performance web applications using the latest technologies.'
    },
    {
      icon: 'GitBranch',
      title: 'CI/CD',
      description: 'Implementing continuous integration and delivery pipelines to streamline development processes.'
    },
    {
      icon: 'Smartphone',
      title: 'Native Mobile Apps',
      description: 'Building native mobile applications for iOS and Android platforms.'
    },
    {
      icon: 'Briefcase',
      title: 'Business Analysis',
      description: 'Analyzing business needs and requirements to deliver tailored solutions.'
    },
    {
      icon: 'Search',
      title: 'SEO',
      description: 'Optimizing websites for search engines to improve visibility and traffic.'
    },
    {
      icon: 'Cog',
      title: 'Automation',
      description: 'Automating tasks and processes to improve efficiency and reduce manual effort.'
    },
    {
      icon: 'Cpu',
      title: 'IoT',
      description: 'Building Internet of Things solutions to connect and manage devices.'
    },
    {
      icon: 'Palette',
      title: 'Shopify Development',
      description: 'Building Shopify themes and stores and customizing themes to meet business needs.'
    },
    {
      icon: 'Brain',
      title: 'AI & ML Development',
      description: 'Building AI & ML solutions to automate tasks and improve efficiency.'
    }
  ],
  testimonials: [
    {
      name: 'Sophia Turner',
      avatar: '/images/avatar-3.png',
      text: 'Duc rebuilt our legacy platform with modern Fullstack Web Development. Page load times dropped by 62% and Core Web Vitals hit green across the board.',
      date: '21 March, 2015'
    },
    {
      name: 'Miguel Alvarez',
      avatar: '/images/avatar-2.png',
      text: 'With a new CI/CD pipeline, deployments went from hours to minutes. Our team now ships confidently multiple times a day.',
      date: '09 October, 2016'
    },
    {
      name: 'Ava Thompson',
      avatar: '/images/avatar-3.png',
      text: 'The Mobile Apps Duc delivered felt fast and polished. We hit 4.8★ on both stores within the first month.',
      date: '17 May, 2017'
    },
    {
      name: 'Grace Williams',
      avatar: '/images/avatar-1.png',
      text: 'His SEO work lifted our key pages to top-3 positions and doubled organic traffic in three months.',
      date: '28 August, 2019'
    },
    {
      name: 'Oliver Chen',
      avatar: '/images/avatar-4.png',
      text: 'Through smart Automation, we eliminated repetitive back-office tasks and reclaimed 40+ hours per week for the team.',
      date: '11 January, 2020'
    },
    {
      name: 'Hannah Schmidt',
      avatar: '/images/avatar-3.png',
      text: 'Our IoT rollout went flawlessly. Real-time monitoring and alerts reduced downtime by 45% in the first quarter.',
      date: '06 July, 2021'
    },
    {
      name: 'Liam O’Connor',
      avatar: '/images/avatar-4.png',
      text: 'Duc migrated our store and created a custom Shopify theme. Conversion rate rose by 23% without increasing ad spend.',
      date: '19 November, 2022'
    },
    {
      name: 'Emily Park',
      avatar: '/images/avatar-2.png',
      text: 'He introduced an ML-based recommendation engine that boosted average order value by 17%. The integration was seamless.',
      date: '12 April, 2023'
    },
    {
      name: 'Jacob Nguyen',
      avatar: '/images/avatar-2.png',
      text: 'Our backend codebase was a mess, but Duc refactored it with clean architecture, strong typing, and excellent performance. Our dev velocity improved noticeably.',
      date: '24 September, 2024'
    },
    {
      name: 'Zara Haddad',
      avatar: '/images/avatar-3.png',
      text: 'CI/CD and test automation transformed our release process. We now deploy on Fridays without fear.',
      date: '05 May, 2025'
    }
  ],
  clients: [
    { name: 'Shopify', logo: '/images/logo-shopify-color.png', url: 'https://shopify.com', bgColor: '#1a1a1a' },
    { name: 'Gạch Minh Đức', logo: '/images/logo-gachminhduc-color.png', url: 'https://gachminhduc.com', bgColor: '#fafafa' },
    { name: 'Học Đại học từ xa', logo: '/images/logo-hocdaihoctuxa-color.png', url: 'https://hocdaihoctuxa.vn', bgColor: '#fafafa' },
    { name: 'Hetzner', logo: '/images/logo-hetzner-color.png', url: 'https://hetzner.com', bgColor: '#f1f1f1' },
    { name: 'Wordpress', logo: '/images/logo-wordpress-color.png', url: 'https://wordpress.com', bgColor: '#21759a' },
    { name: 'Google Cloud', logo: '/images/logo-googlecloud-color.png', url: 'https://cloud.google.com', bgColor: '#f1f1f1' },
    { name: 'AWS', logo: '/images/logo-aws-color.png', url: 'https://aws.amazon.com', bgColor: '#fafafa' },
    { name: 'Moutain', logo: '/images/logo-moutain-color.png', url: '#', bgColor: '#fafafa' },
    { name: 'ExScanner', logo: '/images/logo-exscanner-color.png', url: 'https://exscanner.edu.vn', bgColor: '#fafafa' },
  ]
};

// Personal information for sidebar

export default function AboutPage() {
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
            <About {...aboutData} />
          </div>
        </div>
      </div>
    </main>
  );
}
