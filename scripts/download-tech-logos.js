const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Technology logos mapping with proper SVG URLs
const techLogos = {
  // Front-end
  'react.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'nextjs.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'typescript.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'javascript.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'html5.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'css3.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'tailwindcss.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'sass.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
  'svelte.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
  'sveltekit.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
  'vuejs.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  'nuxtjs.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg',
  'wordpress.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg',
  'angular.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg',

  // Back-end
  'nodejs.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'python.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'php.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  'expressjs.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'django.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  'aspnet.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg',
  'aspnetcore.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
  'aspnetzero.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg',

  // Database
  'mongodb.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'postgresql.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'mysql.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'redis.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'sqlite.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',

  // Tools
  'git.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'docker.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'vscode.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  'figma.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  'postman.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
  'hoppscotch.svg': 'https://hoppscotch.io/_nuxt/img/logo.5174d4b.svg',
  'cursor.ico': 'https://cursor.com/favicon.ico',

  // Other
  'cloudpanel.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg',
  'nginx.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
  'apache.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg',
  'cloudflare.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg',
  'vercel.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
  'heroku.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg',
  'railway.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/railway/railway-original.svg',
  'netlify.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg',
  'tensorflow.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  'keras.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg',
  'pytorch.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
  'opencv.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg',
  'gemini.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg'
};

// Create tech-logos directory if it doesn't exist
const techLogosDir = path.join(__dirname, '..', 'public', 'images', 'tech-logos');
if (!fs.existsSync(techLogosDir)) {
  fs.mkdirSync(techLogosDir, { recursive: true });
}

// Function to download a file with proper handling
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive'
      }
    };
    
    protocol.get(url, options, (response) => {
      if (response.statusCode === 200) {
        let data = '';
        
        response.on('data', (chunk) => {
          data += chunk;
        });
        
        response.on('end', () => {
          try {
            // Write the data as text, not binary
            fs.writeFileSync(filepath, data, 'utf8');
            console.log(`✅ Downloaded: ${path.basename(filepath)}`);
            resolve();
          } catch (err) {
            reject(err);
          }
        });
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirects
        downloadFile(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Download all logos
async function downloadAllLogos() {
  console.log('🚀 Starting download of proper technology logos...\n');
  
  const downloadPromises = Object.entries(techLogos).map(async ([filename, url]) => {
    const filepath = path.join(techLogosDir, filename);
    
    try {
      await downloadFile(url, filepath);
    } catch (error) {
      console.error(`❌ Failed to download ${filename}:`, error.message);
    }
  });
  
  await Promise.all(downloadPromises);
  console.log('\n🎉 Download process completed!');
}

// Run the download
downloadAllLogos().catch(console.error);
