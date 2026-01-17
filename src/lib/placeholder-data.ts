import type { Volunteer, Event, NGO, ForumPost, Testimonial } from './types';

export const volunteer: Volunteer = {
  id: 'vol-1',
  name: 'Priya Sharma',
  avatarUrl: 'avatar-priya-sharma',
  skills: ['Web Development', 'Graphic Design', 'Social Media'],
  interests: ['Education', 'Technology', 'Community Building'],
};

export const allNgos: NGO[] = [
  {
    id: 'ngo-1',
    name: 'Green Earth Foundation',
    logoUrl: 'ngo-green-earth',
    mission: 'To promote environmental conservation and sustainability through community-led initiatives and education.',
    location: 'Puducherry, India',
    cause: ['Environment', 'Education'],
    impact: 'Planted over 10,000 trees and educated 5,000+ students on environmental issues.',
  },
  {
    id: 'ngo-2',
    name: 'Hope Helpers',
    logoUrl: 'ngo-hope-helpers',
    mission: 'Providing food, shelter, and support to underprivileged communities and individuals in need.',
    location: 'Chennai, India',
    cause: ['Community', 'Health'],
    impact: 'Served over 50,000 meals and provided shelter to 200+ homeless individuals last year.',
  },
  {
    id: 'ngo-3',
    name: 'Tech Forward',
    logoUrl: 'ngo-tech-forward',
    mission: 'Empowering youth with digital literacy and coding skills to bridge the technology gap.',
    location: 'Bangalore, India',
    cause: ['Education', 'Technology'],
    impact: 'Trained over 1,000 young adults in coding, with 60% securing jobs in the tech industry.',
  },
   {
    id: 'ngo-4',
    name: 'Animal Allies',
    logoUrl: 'ngo-animal-allies',
    mission: 'Rescuing, rehabilitating, and rehoming stray and abandoned animals.',
    location: 'Puducherry, India',
    cause: ['Animals'],
    impact: 'Rescued over 500 animals and facilitated 300+ adoptions in the past two years.',
  },
];

export const allEvents: Event[] = [
  {
    id: 'evt-1',
    title: 'Annual Beach Cleanup Drive',
    ngoId: 'ngo-1',
    date: 'October 26, 2024',
    time: '8:00 AM - 12:00 PM',
    location: 'Promenade Beach, Puducherry',
    description: 'Join us for our biggest community event of the year! We will be cleaning up Promenade Beach to protect our marine life and keep our city beautiful. Gloves, bags, and refreshments will be provided.',
    skills: ['Teamwork', 'Environmental Awareness'],
    imageUrl: 'event-beach-cleanup',
    cause: 'Environment',
  },
  {
    id: 'evt-2',
    title: 'Weekend Food Donation Sorting',
    ngoId: 'ngo-2',
    date: 'November 2, 2024',
    time: '10:00 AM - 2:00 PM',
    location: 'Hope Helpers Warehouse, Chennai',
    description: 'We need volunteers to help sort and package food donations for distribution to local shelters and families in need. A great way to spend a few hours making a direct impact.',
    skills: ['Organization', 'Teamwork'],
    imageUrl: 'event-food-drive',
    cause: 'Community',
  },
  {
    id: 'evt-3',
    title: 'Intro to Web Development Workshop',
    ngoId: 'ngo-3',
    date: 'November 9, 2024',
    time: '1:00 PM - 5:00 PM',
    location: 'Tech Forward Center, Bangalore',
    description: 'Share your web development skills by mentoring aspiring young coders. We are looking for volunteers to assist with a hands-on workshop covering the basics of HTML, CSS, and JavaScript.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Mentoring'],
    imageUrl: 'event-coding-workshop',
    cause: 'Education',
  },
  {
    id: 'evt-4',
    title: 'Adopt-a-Pet Day at the Shelter',
    ngoId: 'ngo-4',
    date: 'November 16, 2024',
    time: '11:00 AM - 4:00 PM',
    location: 'Animal Allies Shelter, Puducherry',
    description: 'Help us find forever homes for our rescued animals! We need volunteers to assist with handling animals, talking to potential adopters, and managing the event flow.',
    skills: ['Animal Handling', 'Communication'],
    imageUrl: 'event-animal-shelter',
    cause: 'Animals',
  },
  {
    id: 'evt-5',
    title: 'Youth Mentorship Program Kick-off',
    ngoId: 'ngo-3',
    date: 'November 23, 2024',
    time: '2:00 PM - 4:00 PM',
    location: 'Online',
    description: 'Become a mentor and guide a young student in their career journey. This kick-off session will match mentors with mentees and set the stage for a successful program.',
    skills: ['Mentoring', 'Communication', 'Career Guidance'],
    imageUrl: 'event-mentorship-session',
    cause: 'Education',
  },
  {
    id: 'evt-6',
    title: 'Community Tree Planting Day',
    ngoId: 'ngo-1',
    date: 'December 7, 2024',
    time: '9:00 AM - 1:00 PM',
    location: 'Botanical Garden, Puducherry',
    description: 'Help us green our city! We are planting 500 native tree saplings at the Botanical Garden. No prior experience needed, just a willingness to get your hands dirty for a good cause.',
    skills: ['Gardening', 'Teamwork'],
    imageUrl: 'event-tree-planting',
    cause: 'Environment',
  },
];

export const featuredEvents = allEvents.slice(0, 3);
export const upcomingCommitments = allEvents.slice(3, 5);

export const forumPosts: ForumPost[] = [
    {
        id: 'post-1',
        title: 'Best practices for first-time volunteers?',
        authorId: 'vol-2',
        authorName: 'Arjun',
        createdAt: '2 days ago',
        replies: 5,
        lastReply: {
            authorId: 'ngo-1',
            authorName: 'Green Earth',
            createdAt: '3 hours ago',
        }
    },
    {
        id: 'post-2',
        title: 'How do you measure impact for educational programs?',
        authorId: 'ngo-3',
        authorName: 'Tech Forward',
        createdAt: '5 days ago',
        replies: 12,
        lastReply: {
            authorId: 'vol-1',
            authorName: 'Priya Sharma',
            createdAt: '1 day ago',
        }
    },
    {
        id: 'post-3',
        title: 'Share your most memorable volunteering experience!',
        authorId: 'vol-3',
        authorName: 'Sameer',
        createdAt: '1 week ago',
        replies: 28,
        lastReply: {
            authorId: 'vol-4',
            authorName: 'Anika',
            createdAt: 'just now',
        }
    }
];

export const howItWorks = [
  {
    title: 'Discover Opportunities',
    description: 'Browse through a wide range of events and projects posted by trusted NGOs. Filter by your interests, skills, and location to find the perfect match.'
  },
  {
    title: 'Connect & Participate',
    description: 'Sign up for events with a single click. Connect with NGOs, and collaborate with fellow volunteers who share your passion for making a difference.'
  },
  {
    title: 'Track Your Impact',
    description: 'Log your volunteer hours, track your contributions, and earn certificates for your hard work. See the tangible impact you\'re making in the community.'
  }
];

export const testimonials: Testimonial[] = [
    {
        quote: 'ConnectSphere made it so easy to find a cause I\'m passionate about. I\'ve met amazing people and feel like I\'m truly making a difference in my local community.',
        name: 'Jane Doe',
        role: 'Volunteer',
        avatarId: 'avatar-jane-doe'
    },
    {
        quote: 'As a small NGO, finding dedicated volunteers was always a challenge. This platform has connected us with a pool of skilled and enthusiastic individuals. It\'s been a game-changer!',
        name: 'John Smith',
        role: 'Director, Hope Helpers',
        avatarId: 'avatar-john-smith'
    },
    {
        quote: 'The dashboard is fantastic for tracking my hours and seeing my volunteering history all in one place. It keeps me motivated to do more!',
        name: 'Priya Sharma',
        role: 'Volunteer',
        avatarId: 'avatar-priya-sharma'
    }
];
