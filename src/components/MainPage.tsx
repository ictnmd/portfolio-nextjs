// 'use client';

// import { useEffect, useState } from 'react';
// import { Sidebar } from './Sidebar';
// // import { Navbar } from './Navbar';
// import { About } from './pages/About';
// import { Resume } from './pages/Resume';
// import { Portfolio } from './pages/Portfolio';
// import { Blog } from './pages/Blog';
// import { Contact } from './pages/Contact';
// import {CurvedBottomNav} from './CurvedBottomNav';

// // Sample data - in a real app, this would come from a CMS or API
// const personalInfo = {
//   name: 'Duc Nguyen',
//   title: 'Software Engineer',
//   email: 'ictnmd@gmail.com',
//   phone: '+84 908 680 223',
//   yearOfBirth: '2000',
//   location: 'Ho Chi Minh City, Vietnam',
//   avatar: '/images/my-avatar.png',
  
//   socialLinks: {
//     facebook: 'https://fb.com/ictnmd',
//     twitter: '#',
//     instagram: '#',
//   },
// };

// const aboutData = {
//   aboutText: [
//     "I’m a 25-year-old Software Engineer with over a decade of experience, starting my journey in 2010 by self-learning PHP and WordPress to build websites for local businesses. Recognized with provincial and national awards in science and engineering during high school, I was directly admitted to the National University, where I advanced into professional software development. ",
//     "Skilled in Fullstack web development, Android native apps, business analysis, SEO, automation, IoT, CI/CD, and server management, I’m dedicated to leveraging new technologies to optimize efficiency, cut development costs, and deliver impactful solutions for businesses."
//   ],
//   services: [
//     {
//       icon: '/images/icon-design.svg',
//       title: 'Web Design',
//       description: 'The most modern and high-quality design made at a professional level.'
//     },
//     {
//       icon: '/images/icon-dev.svg',
//       title: 'Web Development',
//       description: 'High-quality development of sites at the professional level.'
//     },
//     {
//       icon: '/images/icon-app.svg',
//       title: 'Mobile Apps',
//       description: 'Professional development of applications for iOS and Android.'
//     },
//     {
//       icon: '/images/icon-photo.svg',
//       title: 'Photography',
//       description: 'I make high-quality photos of any category at a professional level.'
//     }
//   ],
//   testimonials: [
//     {
//       name: 'Daniel Lewis',
//       avatar: '/images/avatar-1.png',
//       text: 'Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of client.',
//       date: '14 June, 2021'
//     },
//     {
//       name: 'Jessica Miller',
//       avatar: '/images/avatar-2.png',
//       text: 'Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of client.',
//       date: '14 June, 2021'
//     },
//     {
//       name: 'Emily Evans',
//       avatar: '/images/avatar-3.png',
//       text: 'Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of client.',
//       date: '14 June, 2021'
//     },
//     {
//       name: 'Henry William',
//       avatar: '/images/avatar-4.png',
//       text: 'Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of client.',
//       date: '14 June, 2021'
//     }
//   ],
//   clients: [
//     { name: 'Client 1', logo: '/images/logo-1-color.png', url: '#' },
//     { name: 'Client 2', logo: '/images/logo-2-color.png', url: '#' },
//     { name: 'Client 3', logo: '/images/logo-3-color.png', url: '#' },
//     { name: 'Client 4', logo: '/images/logo-4-color.png', url: '#' },
//     { name: 'Client 5', logo: '/images/logo-5-color.png', url: '#' },
//     { name: 'Client 6', logo: '/images/logo-6-color.png', url: '#' }
//   ]
// };

// const resumeData = {
//   education: [
//     {
//       title: 'University School of the Arts',
//       period: '2007 — 2008',
//       description: 'Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas molestias exceptur.'
//     },
//     {
//       title: 'New York Academy of Art',
//       period: '2006 — 2007',
//       description: 'Ratione voluptatem sequi nesciunt, facere quisquams facere menda ossimus, omnis voluptas assumenda est omnis.'
//     },
//     {
//       title: 'High School of Art and Design',
//       period: '2002 — 2004',
//       description: 'Duis aute irure dolor in reprehenderit in voluptate, quila voluptas mag odit aut fugit, sed consequuntur magni dolores eos.'
//     }
//   ],
//   experience: [
//     {
//       title: 'Creative Director',
//       period: '2015 — Present',
//       description: 'Nemo enim ipsam voluptatem blanditiis praesentium voluptum delenit atque corrupti, quos dolores et qvuas molestias exceptur.'
//     },
//     {
//       title: 'Art Director',
//       period: '2013 — 2015',
//       description: 'Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas molestias exceptur.'
//     },
//     {
//       title: 'Web Designer',
//       period: '2010 — 2013',
//       description: 'Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas molestias exceptur.'
//     }
//   ],
//   skills: [
//     { name: 'Web Design', level: 80 },
//     { name: 'Graphic Design', level: 70 },
//     { name: 'Branding', level: 90 },
//     { name: 'WordPress', level: 50 }
//   ]
// };

// const portfolioData = {
//   projects: [
//     {
//       id: '1',
//       title: 'Finance',
//       category: 'Web Development',
//       image: '/images/project-1.jpg',
//       url: '#'
//     },
//     {
//       id: '2',
//       title: 'Orizon',
//       category: 'Web Development',
//       image: '/images/project-2.png',
//       url: '#'
//     },
//     {
//       id: '3',
//       title: 'Fundo',
//       category: 'Web Design',
//       image: '/images/project-3.jpg',
//       url: '#'
//     },
//     {
//       id: '4',
//       title: 'Brawlhalla',
//       category: 'Applications',
//       image: '/images/project-4.png',
//       url: '#'
//     },
//     {
//       id: '5',
//       title: 'DSM.',
//       category: 'Web Design',
//       image: '/images/project-5.png',
//       url: '#'
//     },
//     {
//       id: '6',
//       title: 'MetaSpark',
//       category: 'Web Design',
//       image: '/images/project-6.png',
//       url: '#'
//     },
//     {
//       id: '7',
//       title: 'Summary',
//       category: 'Web Development',
//       image: '/images/project-7.png',
//       url: '#'
//     },
//     {
//       id: '8',
//       title: 'Task Manager',
//       category: 'Applications',
//       image: '/images/project-8.jpg',
//       url: '#'
//     },
//     {
//       id: '9',
//       title: 'Arrival',
//       category: 'Web Development',
//       image: '/images/project-9.png',
//       url: '#'
//     }
//   ]
// };

// const blogData = {
//   posts: [
//     {
//       id: '1',
//       title: 'Design Conferences in 2022',
//       excerpt: 'Veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
//       category: 'Design',
//       date: 'Feb 23, 2022',
//       image: '/images/blog-1.jpg',
//       url: '#'
//     },
//     {
//       id: '2',
//       title: 'Best Fonts Every Designer',
//       excerpt: 'Sed ut perspiciatis, nam libero tempore, cum soluta nobis est eligendi.',
//       category: 'Design',
//       date: 'Feb 23, 2022',
//       image: '/images/blog-2.jpg',
//       url: '#'
//     },
//     {
//       id: '3',
//       title: 'Design Digest #80',
//       excerpt: 'Excepteur sint occaecat cupidatat no proident, quis nostrum exercitationem ullam corporis suscipit.',
//       category: 'Design',
//       date: 'Feb 23, 2022',
//       image: '/images/blog-3.jpg',
//       url: '#'
//     },
//     {
//       id: '4',
//       title: 'UI Interactions of the Week',
//       excerpt: 'Enim ad minim veniam, consectetur adipiscing elit, quis nostrud exercitation ullamco laboris nisi.',
//       category: 'Design',
//       date: 'Feb 23, 2022',
//       image: '/images/blog-4.jpg',
//       url: '#'
//     },
//     {
//       id: '5',
//       title: 'The Forgotten Art of Spacing',
//       excerpt: 'Maxime placeat, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//       category: 'Design',
//       date: 'Feb 23, 2022',
//       image: '/images/blog-5.jpg',
//       url: '#'
//     },
//     {
//       id: '6',
//       title: 'Design Digest #79',
//       excerpt: 'Optio cumque nihil impedit uo minus quod maxime placeat, velit esse cillum.',
//       category: 'Design',
//       date: 'Feb 23, 2022',
//       image: '/images/blog-6.jpg',
//       url: '#'
//     }
//   ]
// };

// const contactData = {
//   email: personalInfo.email,
//   phone: personalInfo.phone,
//   location: personalInfo.location,
//   mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199666.5651251294!2d-121.58334177520186!3d38.56165006739519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac672b28397f9%3A0x921f6aaa74197fdb!2sSacramento%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1647608789441!5m2!1sen!2sbd'
// };

// export function MainPage() {
//   const [activeSection, setActiveSection] = useState('about');

//   // Smoothly scroll to the section header (h2) after changing section
//   useEffect(() => {
//     // Wait for the DOM to update with the new section
//     const id = window.requestAnimationFrame(() => {
//       const heading = document.querySelector('article h2');
//       if (heading) {
//         heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       } else {
//         // Fallback: scroll to top if heading not found
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       }
//     });
//     return () => window.cancelAnimationFrame(id);
//   }, [activeSection]);

//   const renderSection = () => {
//     switch (activeSection) {
//       case 'about':
//         return <About {...aboutData} />;
//       case 'resume':
//         return <Resume {...resumeData} />;
//       case 'portfolio':
//         return <Portfolio {...portfolioData} />;
//       case 'blog':
//         return <Blog {...blogData} />;
//       case 'contact':
//         return <Contact {...contactData} />;
//       default:
//         return <About {...aboutData} />;
//     }
//   };

//   return (
//     <main className="min-h-screen bg-background-primary">
//       <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Sidebar */}
//           <div className="lg:col-span-1 lg:sticky lg:top-8 self-start">
//             <Sidebar {...personalInfo} />
//           </div>
          
//           {/* Main Content */}
//           <div className="lg:col-span-3">
//             {renderSection()}
//           </div>
//         </div>
//       </div>
      
//       {/* Navbar */}
//       {/* <Navbar activeSection={activeSection} onSectionChange={setActiveSection} /> */}
//       <CurvedBottomNav activeSection={activeSection} onSectionChange={setActiveSection} />
//     </main>
//   );
// }
