import { Resume } from '@/components/pages/Resume';
import { Sidebar } from '@/components/Sidebar';
import { personalInfo } from '@/data/personalInfo';

// Sample data - in a real app, this would come from a CMS or API
const resumeData = {
  education: [
    {
      title: 'University Of Information Technology, Viet Nam National University HCMC',
      period: '2018 — 2022',
      description: ['Major in Software Engineering','Built a strong foundation in computer science, software development lifecycle, and engineering best practices.','Led multiple academic and extracurricular projects as Tech Lead, focusing on architecture design, task delegation, and team collaboration.']
    },
    {
      title: 'Udemy Courses',
      period: '2023 — 2025',
      description: ['Complete 20+ courses on Udemy, covering topics such as Python, Machine Learning, and Web Development.','Apply learned skills to build real-world projects, including a real-time multiple choices grading mobile application and a decision support system for real estate market analysis.','Continuously expand knowledge in software development and AI to enhance professional capabilities.']
    }
  ],
  experience: [
    {
      title: 'Wordpress Freelancer',
      period: '2012 — Present',
      description: 'Built and maintained websites for clients using Wordpress, customizing themes and plugins to meet their needs.'
    },
    {
      title: 'ExScanner',
      period: '2018 — Present',
      description: 'Exscanner is a realtime multiple choices grading mobile application that save a lot of time for teacher all over the world. This app allow teacher to scan the answer sheet and get the result instantly. I also won the first prize in the Provincial Science and Technology Competition, and fourth prize in the National Science and Technology Competition in 2018.',
      Team_size: '3',
      role: 'Tech Lead, Developer',
      contribution: ['Analyze project requirements', 'Design software architecture', 'Design database structure', 'Optimize images pre-processing phase', 'Build & optimize grading algorithm','Built the core features of the app, including the answer sheet scanning, result calculation, and data analysis.','Optimize the app performance and user experience.'],
      main_tech: 'Java, Android, SQLite, OpenCV 3'
    },
    {
      title: 'EShip',
      period: '2020 - 2020',
      description: 'EShip is a online F&B platform allow users to list their restaurants, be a deliverer or a customer. In short, this platform likes Grab Food.',
      Team_size: '3',
      role: 'Developer',
      contribution: ['Implement realtime feature', 'Develop feature in admin dashboard ', 'Develop mobile front-end'],
      main_tech: 'PHP, Laravel, Firebase, Client-Server, Flutter, MariaDB, Google Cloud Platform, Firebase Cloud Messaging'
    },
    {
      title: 'Cyber Demonstation',
      period: '2020 — 2021',
      description: 'This application supports teaching cyber attack techniques. Simulating network attack techniques vividly to help students acquire knowledge quickly and effectively.',
      Team_size: '1',
      role: 'Developer',
      contribution: ['Analyze project requirements', 'Design software architecture', 'Design database structure', 'Write scripts for each network attack techniques ', 'Develop application',],
      main_tech: 'C#, WPF, SQL Server, Javascript, PHP, HTML, CSS'
    },
    {
      title: 'DGA Botnet Detection',
      period: '2020 — 2021',
      description: 'Description This project has two objectives, one for checking out the given domain is DGA or not. The other objective is detecting DGA family of the given domain. The dataset for project has more than 1 million DGA among 56 malware families and top 1 million Alexa domains.',
      Team_size: '2',
      role: 'ML Engineer',
      contribution: ['Analyze project requirements', 'Select features', 'Optimize ML models',],
      main_tech: 'Python, TF-IDF, Logistic regression, Random forest, NN, SVM, TensorFlow, Keras, ...'
    },
    {
      title: 'Homies Real Estate',
      period: '2020 — 2022',
      description: 'Mobile application for posting and renting real estate with top-ups, advanced decentralized management of Identity server. Especially this app have a decision support system based on market prices in HCMC.',
      Team_size: '4',
      role: 'Tech Lead, Back-end Developer',
      contribution: ['Analyze project requirements', 'Design software architecture', 'Design database structure','Crawl & analyze data for DSS', 'Develop RESTful API'],
      main_tech: 'C#, Client-Server, ASP.NET Zero, Angular, Identity Server, Entity Framework, Flutter, MariaDB'
    },
    {
      title: 'Shopify Theme Developer',
      period: '2024 — 2025',
      description: 'Developing Shopify themes for clients to meet their business needs.',
      Team_size: '2',
      role: 'Developer',
      contribution: ['Front-end development', 'Shopify theme development'],
      main_tech: 'Liquid, Shopify, CSS, HTML, Javascript'
    },
    {
      title: 'Ankora Automated Growing Technology',
      period: '2023 — 2025',
      description: 'Ankora provides automated growing technology for plants. Include automated watering, lighting, temperature control, with IoT devices and AI-based decision-making, increase productivity, cost reduction, and biotechnology solutions stimulate plant growth.',
      Team_size: '5',
      role: 'Tech Lead, Developer',
      contribution: ['Analyze project requirements', 'Design software architecture', 'Design database structure', 'Develop RESTful API', 'Develop AI model','Connect IoT devices','Develop mobile app'],
      main_tech: 'Python, PostgreSQL, Raspberry Pi, ESP32, MQTT, Nodejs'
    }
  ],
  awards: [
    {
      title: 'First Prize in Provincial Science and Technology Competition',
      period: '2018',
      description: 'The first prize in the Provincial Science and Technology Competition in 2018.'
    },
    {
      title: 'Fourth Prize in National Science and Technology Competition',
      period: '2018',
      description: 'The fourth prize in the National Science and Technology Competition in 2018.'
    }
  ]
};

// Personal information for sidebar

export default function ResumePage() {
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
            <Resume 
              education={resumeData.education}
              experience={resumeData.experience}
              awards={resumeData.awards}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
