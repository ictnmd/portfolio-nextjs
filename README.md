# Portfolio Website - Next.js & Tailwind CSS

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features easy theme customization, smooth animations, intelligent link prefetching, and a mobile-first design.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Intelligent Prefetching**: Advanced link prefetching for lightning-fast navigation
- **Theme System**: Easy color and style customization with CSS variables
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Smooth Animations**: Framer Motion for enhanced user experience
- **Component-Based**: Modular React components for easy maintenance
- **Type Safety**: Full TypeScript support with shared data interfaces
- **Performance**: Optimized images, code splitting, and prefetching strategies
- **Development Tools**: Built-in prefetch monitoring for development

## 📁 Project Structure

```
portfolio-nextjs/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── about/              # About page
│   │   ├── portfolio/          # Portfolio page
│   │   ├── resume/             # Resume page
│   │   ├── technologies/       # Technologies page
│   │   ├── contact/            # Contact page
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout with prefetching
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── pages/              # Page components
│   │   │   ├── About.tsx
│   │   │   ├── Resume.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Technologies.tsx
│   │   │   └── Contact.tsx
│   │   ├── MainPage.tsx        # Main page component
│   │   ├── Sidebar.tsx         # Sidebar component
│   │   ├── Navbar.tsx          # Navigation component with prefetching
│   │   ├── CurvedBottomNav.tsx # Curved navigation with prefetching
│   │   ├── PrefetchLink.tsx    # Custom prefetch link component
│   │   ├── PrefetchMonitor.tsx # Development prefetch monitoring
│   │   ├── ThemeProvider.tsx   # Theme CSS variables provider
│   │   └── ThemeSwitcher.tsx   # Theme switcher component
│   ├── data/                   # Shared data sources
│   │   └── personalInfo.ts     # Centralized personal information
│   ├── config/                 # Configuration files
│   │   └── theme.ts            # Theme configuration
│   ├── contexts/               # React contexts
│   │   └── ThemeContext.tsx    # Theme context
│   └── docs/                   # Documentation
│       └── PREFETCH_IMPLEMENTATION.md # Prefetching documentation
├── public/
│   └── images/                 # Static assets
├── next.config.ts              # Next.js configuration with optimizations
└── tailwind.config.ts          # Tailwind configuration
```

## ⚡ Performance & Prefetching

### Intelligent Link Prefetching

The portfolio includes advanced link prefetching strategies for lightning-fast navigation:

- **Static Prefetching**: Critical routes are prefetched in the HTML head
- **Hover Prefetching**: Routes are prefetched when users hover over navigation items
- **Smart Prefetching**: Multiple strategies (hover, visible, idle) for optimal performance
- **Development Monitoring**: Real-time prefetch tracking in development mode

### Performance Benefits

- **Navigation Speed**: Reduced from ~200-500ms to ~50-100ms
- **User Experience**: Instant route transitions
- **Smart Loading**: Only prefetches when users show intent
- **Bundle Optimization**: Package import optimization and tree shaking

### Prefetch Configuration

The prefetching is automatically configured in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // ... other optimizations
};
```

For detailed prefetching documentation, see `src/docs/PREFETCH_IMPLEMENTATION.md`.

## 🎨 Theme Customization

### Quick Theme Changes

The portfolio includes several pre-built themes that you can easily switch between:

1. **Default Theme**: Original dark theme with yellow accents
2. **Dark Theme**: Purple and gold color scheme
3. **Light Theme**: Clean light theme with blue accents
4. **Green Theme**: Modern green and emerald color scheme

### Creating Custom Themes

To create your own theme, edit `src/config/theme.ts`:

```typescript
export const myCustomTheme: ThemeConfig = {
  colors: {
    primary: '#your-primary-color',
    secondary: '#your-secondary-color',
    accent: '#your-accent-color',
    background: {
      primary: '#your-bg-primary',
      secondary: '#your-bg-secondary',
      tertiary: '#your-bg-tertiary',
    },
    text: {
      primary: '#your-text-primary',
      secondary: '#your-text-secondary',
      muted: '#your-text-muted',
    },
    border: '#your-border-color',
    gradient: {
      primary: 'linear-gradient(135deg, #color1 0%, #color2 100%)',
      secondary: 'linear-gradient(135deg, #color1 0%, #color2 100%)',
      accent: 'linear-gradient(135deg, #color1 0%, #color2 100%)',
    },
  },
  // ... other theme properties
};
```

Then add it to the `availableThemes` array in `src/contexts/ThemeContext.tsx`.

### CSS Variables

The theme system uses CSS variables that are automatically applied. You can override them in your global CSS:

```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  /* ... other variables */
}
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server with prefetch monitoring
- `npm run build` - Build for production with optimizations
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static site (if configured)

### Development Features

- **Prefetch Monitor**: Real-time prefetch tracking in development mode
- **Hot Reload**: Instant updates during development
- **TypeScript**: Full type checking and IntelliSense
- **ESLint**: Code quality and consistency checks
- **Performance Monitoring**: Built-in performance tracking

## 📝 Content Customization

### Personal Information

Edit the personal information in `src/data/personalInfo.ts` (centralized data source):

```typescript
export const personalInfo: PersonalInfo = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your@email.com',
  phone: '+1 (123) 456-7890',
  location: 'Your City, State, Country',
  avatar: '/images/your-avatar.png',
  yearOfBirth: '1990',
  socialLinks: {
    facebook: 'https://facebook.com/yourprofile',
    twitter: 'https://twitter.com/yourprofile',
    instagram: 'https://instagram.com/yourprofile',
    github: 'https://github.com/yourprofile',
  },
};
```

**Benefits of Centralized Data:**
- Single source of truth for all personal information
- Type safety with TypeScript interfaces
- Automatic updates across all pages
- Easy maintenance and consistency

### About Section

Update the about content in `src/app/about/page.tsx`:

```typescript
const aboutData = {
  aboutText: [
    "Your first paragraph...",
    "Your second paragraph...",
  ],
  highlightText: "Your highlight text...",
  services: [
    {
      icon: 'Code2', // Lucide icon name
      title: 'Service Title',
      description: 'Service description...'
    },
    // ... more services
  ],
  testimonials: [
    {
      name: 'Client Name',
      role: 'Client Role',
      content: 'Testimonial content...',
      avatar: '/images/avatar-1.png'
    },
    // ... more testimonials
  ],
  clients: [
    { name: 'Client Name', logo: '/images/client-logo.png', url: 'https://client-website.com' },
    // ... more clients
  ]
};
```

### Portfolio Projects

Add your projects in `src/app/portfolio/page.tsx`:

```typescript
const portfolioData = {
  projects: [
    {
      id: 'unique-id',
      title: 'Project Title',
      category: 'Web Development', // or 'Web Design', 'Applications'
      image: '/images/project-image.jpg',
      url: 'https://your-project-url.com',
      description: 'Project description...',
      technologies: ['React', 'TypeScript', 'Tailwind CSS']
    },
    // ... more projects
  ]
};
```

### Resume Data

Update your education, experience, and skills in `src/app/resume/page.tsx`:

```typescript
const resumeData = {
  education: [
    {
      title: 'Degree Title',
      institution: 'University Name',
      period: 'Start Year — End Year',
      description: 'Description...',
      gpa: '3.8/4.0' // Optional
    },
    // ... more education
  ],
  experience: [
    {
      title: 'Job Title',
      company: 'Company Name',
      period: 'Start Year — End Year',
      description: 'Job description...',
      achievements: ['Achievement 1', 'Achievement 2']
    },
    // ... more experience
  ],
  skills: [
    { name: 'Skill Name', level: 85 }, // level is percentage (0-100)
    // ... more skills
  ],
  certifications: [
    {
      name: 'Certification Name',
      issuer: 'Issuing Organization',
      date: 'Month Year',
      credentialId: 'Credential ID' // Optional
    },
    // ... more certifications
  ]
};
```

### Technologies & Tools

Add your technologies and tools organized by categories in `src/app/technologies/page.tsx`:

```typescript
const technologiesData = {
  categories: [
    {
      name: 'Front-end',
      technologies: [
        {
          name: 'React',
          logo: '/images/tech-logos/react.svg',
          link: 'https://reactjs.org',
          description: 'JavaScript library for building user interfaces'
        },
        // ... more front-end technologies
      ]
    },
    {
      name: 'Back-end',
      technologies: [
        {
          name: 'Node.js',
          logo: '/images/tech-logos/nodejs.svg',
          link: 'https://nodejs.org',
          description: 'JavaScript runtime for server-side development'
        },
        // ... more back-end technologies
      ]
    },
    {
      name: 'Database',
      technologies: [
        {
          name: 'MongoDB',
          logo: '/images/tech-logos/mongodb.svg',
          link: 'https://www.mongodb.com',
          description: 'NoSQL database for modern applications'
        },
        // ... more database technologies
      ]
    },
    {
      name: 'Tools',
      technologies: [
        {
          name: 'Git',
          logo: '/images/tech-logos/git.svg',
          link: 'https://git-scm.com',
          description: 'Version control system'
        },
        // ... more tools
      ]
    },
    {
      name: 'Cloud & DevOps',
      technologies: [
        {
          name: 'AWS',
          logo: '/images/logo-aws-color.png',
          link: 'https://aws.amazon.com',
          description: 'Cloud computing platform'
        },
        // ... more cloud technologies
      ]
    }
  ]
};
```

## 🎨 Styling

### Tailwind CSS Classes

The project uses Tailwind CSS with custom theme variables. Key classes include:

- `bg-background-primary` - Primary background color
- `text-text-primary` - Primary text color
- `border-border` - Border color
- `bg-gradient-primary` - Primary gradient background
- `text-primary` - Primary accent color

### Custom CSS

Add custom styles in `src/app/globals.css`:

```css
/* Your custom styles */
.my-custom-class {
  /* styles */
}
```

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

Build the project and deploy the `out` folder:

```bash
npm run build
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key

# SMTP Configuration (for contact form via Nodemailer)
# Your SMTP provider credentials (e.g., Gmail, SendGrid, Mailgun, custom SMTP)
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_SECURE=false # true for port 465, false for others
SMTP_FROM_EMAIL=noreply@yourdomain.com
SMTP_FROM_NAME=Portfolio Contact Form
# Optional: override recipient (defaults to personalInfo.email)
SMTP_TO_EMAIL=your_inbox@yourdomain.com
```

#### Setting up SMTP for Contact Form

1. **Choose an SMTP provider**: (e.g., Gmail, SendGrid, Mailgun, your hosting)
2. **Get SMTP credentials**: host, port, username, password
3. **Configure Environment Variables** in `.env.local` as shown above
4. **Use a verified sender**: ensure `SMTP_FROM_EMAIL` is allowed by your provider
5. **Test the Contact Form**: submit the form on `/contact` and check your inbox

### Next.js Configuration

Edit `next.config.ts` for additional configuration:

```typescript
const nextConfig = {
  // Your configuration
};

export default nextConfig;
```

## 🐳 Docker Deployment

This project includes Docker configuration for easy deployment with `output: 'standalone'` mode, which enables server-side functionality including the contact SMTP API route.

### Prerequisites

- Docker and Docker Compose installed
- Environment variables configured (see Environment Variables section)

### Building and Running with Docker

1. **Build the Docker image**:
   ```bash
   docker build -t portfolio-nextjs .
   ```

2. **Run the container**:
   ```bash
   docker run -p 3000:3000 \
     -e SMTP_HOST=smtp.yourprovider.com \
     -e SMTP_PORT=587 \
     -e SMTP_USER=your_smtp_username \
     -e SMTP_PASS=your_smtp_password \
     -e SMTP_SECURE=false \
     -e SMTP_FROM_EMAIL=noreply@yourdomain.com \
     -e SMTP_FROM_NAME="Portfolio Contact Form" \
     -e SMTP_TO_EMAIL=your_inbox@yourdomain.com \
     portfolio-nextjs
   ```

3. **Using Docker Compose** (recommended):
   ```bash
   # Create .env.local with your environment variables
   docker-compose up -d
   ```

### Docker Features

- **Multi-stage build** for optimized image size
- **Non-root user** for security
- **Health checks** for container monitoring
- **Standalone mode** enabling server-side API routes
- **Production optimizations** including console log removal

### Environment Variables for Docker

Create a `.env.local` file with:
```env
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_SECURE=false
SMTP_FROM_EMAIL=noreply@yourdomain.com
SMTP_FROM_NAME=Portfolio Contact Form
SMTP_TO_EMAIL=your_inbox@yourdomain.com
```

### Health Check

The application includes a health check endpoint at `/api/health` that returns:
- Application status
- Timestamp
- Uptime information

### Production Deployment

For production deployment:

1. **Use a reverse proxy** (nginx, Apache) in front of the container
2. **Set up SSL/TLS** certificates
3. **Configure proper logging** and monitoring
4. **Use environment-specific configurations**

Example nginx configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Happy coding! 🎉**