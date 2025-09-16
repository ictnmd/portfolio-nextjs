import { Portfolio } from '@/components/pages/Portfolio';
import { Sidebar } from '@/components/Sidebar';
import { personalInfo } from '@/data/personalInfo';

// Sample data - in a real app, this would come from a CMS or API
const portfolioData = {
  projects: [
    {
      id: '1',
      title: 'Finance',
      category: 'Web Development',
      image: '/images/project-1.jpg',
      url: '#'
    },
    {
      id: '2',
      title: 'Orizon',
      category: 'Web Development',
      image: '/images/project-2.png',
      url: '#'
    },
    {
      id: '3',
      title: 'Fundo',
      category: 'Web Design',
      image: '/images/project-3.jpg',
      url: '#'
    },
    {
      id: '4',
      title: 'Brawlhalla',
      category: 'Applications',
      image: '/images/project-4.png',
      url: '#'
    },
    {
      id: '5',
      title: 'DSM.',
      category: 'Web Design',
      image: '/images/project-5.png',
      url: '#'
    },
    {
      id: '6',
      title: 'MetaSpark',
      category: 'Web Design',
      image: '/images/project-6.png',
      url: '#'
    },
    {
      id: '7',
      title: 'Summary',
      category: 'Web Development',
      image: '/images/project-7.png',
      url: '#'
    },
    {
      id: '8',
      title: 'Task Manager',
      category: 'Applications',
      image: '/images/project-8.jpg',
      url: '#'
    },
    {
      id: '9',
      title: 'Arrival',
      category: 'Web Development',
      image: '/images/project-9.png',
      url: '#'
    }
  ]
};

// Personal information for sidebar

export default function PortfolioPage() {
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
            <Portfolio {...portfolioData} />
          </div>
        </div>
      </div>
    </main>
  );
}
