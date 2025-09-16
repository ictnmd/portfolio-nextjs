import { Technologies } from '@/components/pages/Technologies';
import { Sidebar } from '@/components/Sidebar';
import { personalInfo } from '@/data/personalInfo';

// Sample technologies data - in a real app, this would come from a CMS or API
const technologiesData = {
  categories: [
    {
      name: 'Front-end',
      technologies: [
        {
          name: 'React',
          logo: '/images/tech-logos/react.svg',
          link: 'https://reactjs.org'
        },
        {
          name: 'Next.js',
          logo: '/images/tech-logos/nextjs.svg',
          link: 'https://nextjs.org'
        },
        {
          name: 'TypeScript',
          logo: '/images/tech-logos/typescript.svg',
          link: 'https://www.typescriptlang.org'
        },
        {
          name: 'JavaScript',
          logo: '/images/tech-logos/javascript.svg',
          link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
        },
        {
          name: 'HTML5',
          logo: '/images/tech-logos/html5.svg',
          link: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
        },
        {
          name: 'CSS3',
          logo: '/images/tech-logos/css3.svg',
          link: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
        },
        {
          name: 'Tailwind CSS',
          logo: '/images/tech-logos/tailwindcss.svg',
          link: 'https://tailwindcss.com'
        },
        {
          name: 'Sass',
          logo: '/images/tech-logos/sass.svg',
          link: 'https://sass-lang.com'
        },
        {
          name: 'Svelte',
          logo: '/images/tech-logos/svelte.svg',
          link: 'https://svelte.dev'
        },
        {
          name: 'SvelteKit',
          logo: '/images/tech-logos/sveltekit.svg',
          link: 'https://kit.svelte.dev'
        },
        {
          name: 'Vue.js',
          logo: '/images/tech-logos/vuejs.svg',
          link: 'https://vuejs.org'
        },
        {
          name: 'Nuxt.js',
          logo: '/images/tech-logos/nuxtjs.svg',
          link: 'https://nuxtjs.org'
        },
        {
          name: 'WordPress',
          logo: '/images/tech-logos/wordpress.svg',
          link: 'https://wordpress.org'
        },
        {
          name: 'Shopify',
          logo: '/images/tech-logos/shopify.svg',
          link: 'https://www.shopify.com'
        },
        {
          name: 'Framer Motion',
          logo: '/images/tech-logos/framer.svg',
          link: 'https://www.framer.com'
        },
        {
          name: 'GSAP',
          logo: '/images/tech-logos/gsap.svg',
          link: 'https://www.gsap.com'
        },
        {
          name: 'Angular',
          logo: '/images/tech-logos/angular.svg',
          link: 'https://angular.io'
        }

        
      ]
    },
    {
      name: 'Back-end',
      technologies: [
        {
          name: 'Node.js',
          logo: '/images/tech-logos/nodejs.svg',
          link: 'https://nodejs.org'
        },
        {
          name: 'Python',
          logo: '/images/tech-logos/python.svg',
          link: 'https://www.python.org'
        },
        {
          name: 'PHP',
          logo: '/images/tech-logos/php.svg',
          link: 'https://www.php.net'
        },
        {
          name: 'Express.js',
          logo: '/images/tech-logos/expressjs.svg',
          link: 'https://expressjs.com'
        },
        {
          name: 'Django',
          logo: '/images/tech-logos/django.svg',
          link: 'https://www.djangoproject.com'
        },
        {
          name: 'Laravel',
          logo: '/images/tech-logos/laravel.svg',
          link: 'https://laravel.com'
        },
        {
          name: 'ASP.NET',
          logo: '/images/tech-logos/aspnet.svg',
          link: 'https://dotnet.microsoft.com/apps/aspnet'
        },
        {
          name: 'ASP.NET Core',
          logo: '/images/tech-logos/aspnetcore.svg',
          link: 'https://dotnet.microsoft.com/apps/aspnet/core'
        },
        {
          name: 'ASP.NET Zero',
          logo: '/images/tech-logos/aspnetzero.svg',
          link: 'https://aspnetzero.com'
        },
        {
          name: 'NestJS',
          logo: '/images/tech-logos/nestjs.svg',
          link: 'https://nestjs.com'
        },
        {
          name: 'Directus',
          logo: '/images/tech-logos/directus.svg',
          link: 'https://directus.io'
        },
        {
          name: 'Payload CMS',
          logo: '/images/tech-logos/payloadcms.svg',
          link: 'https://payloadcms.com'
        }
      ]
    },
    {
      name: 'Database',
      technologies: [
        {
          name: 'MongoDB',
          logo: '/images/tech-logos/mongodb.svg',
          link: 'https://www.mongodb.com'
        },
        {
          name: 'PostgreSQL',
          logo: '/images/tech-logos/postgresql.svg',
          link: 'https://www.postgresql.org'
        },
        {
          name: 'MySQL',
          logo: '/images/tech-logos/mysql.svg',
          link: 'https://www.mysql.com'
        },
        {
          name: 'Redis',
          logo: '/images/tech-logos/redis.svg',
          link: 'https://redis.io'
        },
        {
          name: 'SQLite',
          logo: '/images/tech-logos/sqlite.svg',
          link: 'https://www.sqlite.org'
        }
      ]
    },
    {
      name: 'Tools',
      technologies: [
        {
          name: 'Git',
          logo: '/images/tech-logos/git.svg',
          link: 'https://git-scm.com'
        },
        {
          name: 'Docker',
          logo: '/images/tech-logos/docker.svg',
          link: 'https://www.docker.com'
        },
        {
          name: 'VS Code',
          logo: '/images/tech-logos/vscode.svg',
          link: 'https://code.visualstudio.com'
        },
        {
          name: 'Figma',
          logo: '/images/tech-logos/figma.svg',
          link: 'https://www.figma.com'
        },
        {
          name: 'Postman',
          logo: '/images/tech-logos/postman.svg',
          link: 'https://www.postman.com'
        },
        {
          name: 'Hoppscotch',
          logo: '/images/tech-logos/hoppscotch.svg',
          link: 'https://hoppscotch.io'
        },
        {
          name: 'Cursor',
          logo: '/images/tech-logos/cursor.svg',
          link: 'https://cursor.com'
        }
      ]
    },
    {
      name: 'Other',
      technologies: [
        {
          name: 'AWS',
          logo: '/images/tech-logos/aws.svg',
          link: 'https://aws.amazon.com'
        },
        {
          name: 'Google Cloud',
          logo: '/images/tech-logos/googlecloud.svg',
          link: 'https://cloud.google.com'
        },
        {
          name: 'Hetzner',
          logo: '/images/tech-logos/hetzner.svg',
          link: 'https://www.hetzner.com'
        },
        {
          name: 'CloudPanel',
          logo: '/images/tech-logos/cloudpanel.svg',
          link: 'https://cloudpanel.io'
        },
        {
          name: 'Nginx',
          logo: '/images/tech-logos/nginx.svg',
          link: 'https://nginx.org'
        },
        {
          name: 'Apache',
          logo: '/images/tech-logos/apache.svg',
          link: 'https://apache.org'
        },
        {
          name: 'Cloudflare',
          logo: '/images/tech-logos/cloudflare.svg',
          link: 'https://cloudflare.com'
        },
        {
          name: 'Vercel',
          logo: '/images/tech-logos/vercel.svg',
          link: 'https://vercel.com'
        },
        {
          name: 'Heroku',
          logo: '/images/tech-logos/heroku.svg',
          link: 'https://heroku.com'
        },
        {
          name: 'Railway',
          logo: '/images/tech-logos/railway.svg',
          link: 'https://railway.com'
        },
        {
          name: 'Netlify',
          logo: '/images/tech-logos/netlify.svg',
          link: 'https://netlify.com'
        },
        {
          name: 'TensorFlow',
          logo: '/images/tech-logos/tensorflow.svg',
          link: 'https://tensorflow.org'
        },
        {
          name: 'Keras',
          logo: '/images/tech-logos/keras.svg',
          link: 'https://keras.io'
        },
        {
          name: 'PyTorch',
          logo: '/images/tech-logos/pytorch.svg',
          link: 'https://pytorch.org'
        },
        {
          name: 'OpenCV',
          logo: '/images/tech-logos/opencv.svg',
          link: 'https://opencv.org'
        },
        {
          name: 'OpenAI',
          logo: '/images/tech-logos/openai.svg',
          link: 'https://openai.com'
        },
        {
          name: 'n8n',
          logo: '/images/tech-logos/n8n.svg',
          link: 'https://n8n.io'
        },
        {
          name: 'Gemini',
          logo: '/images/tech-logos/gemini.svg',
          link: 'https://gemini.google.com'
        },
      ]
    }
  ]
};

// Personal information for sidebar

export default function TechnologiesPage() {
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
            <Technologies categories={technologiesData.categories} />
          </div>
        </div>
      </div>
    </main>
  );
}
