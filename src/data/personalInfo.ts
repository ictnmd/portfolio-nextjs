export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  avatar: string;
  yearOfBirth: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: 'Duc Nguyen',
  title: 'Software Engineer',
  email: 'ictnmd@gmail.com',
  location: 'Ho Chi Minh City, Vietnam',
  avatar: '/images/my-avatar.png',
  yearOfBirth: '2000',
  socialLinks: {
    facebook: 'https://facebook.com/ictnmd',
    twitter: 'https://twitter.com/ictnmd',
    instagram: 'https://instagram.com/ictnmd',
    github: 'https://github.com/ictnmd'
  }
};
