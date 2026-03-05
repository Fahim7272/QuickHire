// mockData.js — Normalized types, expanded descriptions, rich mock data

import companyLogo1 from '../assets/Company Logo-1.png';
import companyLogo2 from '../assets/Company Logo-2.png';
import companyLogo3 from '../assets/Company Logo-3.png';
import companyLogo4 from '../assets/Company Logo-4.png';
import companyLogo5 from '../assets/Company Logo-5.png';
import companyLogo6 from '../assets/Company Logo-6.png';
import companyLogo7 from '../assets/Company Logo-7.png';
import companyLogo8 from '../assets/Company Logo-8.png';

import latestLogo1 from '../assets/Latest jobs logo-1.png';
import latestLogo2 from '../assets/Latest jobs logo-2.png';
import latestLogo3 from '../assets/Latest jobs logo-3.png';
import latestLogo4 from '../assets/Latest jobs logo-4.png';
import latestLogo5 from '../assets/Latest jobs logo-5.png';
import latestLogo6 from '../assets/Latest jobs logo-6.png';
import latestLogo7 from '../assets/Latest jobs logo-7.png';
import latestLogo8 from '../assets/Latest jobs logo-8.png';

export const mockJobs = [
    {
        id: 1,
        title: 'Email Marketing Specialist',
        company: 'Revolut',
        company_logo: companyLogo1,
        location: 'Madrid, Spain',
        category: 'Marketing',
        type: 'Full Time',
        description: 'Revolut is looking for an Email Marketing Specialist to help grow and engage our global customer base. You will design, execute, and optimize email campaigns across multiple markets, working closely with product and data teams.',
        tags: ['Marketing', 'Design'],
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 2,
        title: 'Brand Designer',
        company: 'Dropbox',
        company_logo: companyLogo2,
        location: 'San Francisco, US',
        category: 'Design',
        type: 'Full Time',
        description: 'Dropbox is seeking a talented Brand Designer to shape how the world perceives our product. You\'ll work within our design system to create visually compelling assets for campaigns, social media, and product features.',
        tags: ['Design', 'Business'],
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 3,
        title: 'Customer Success Manager',
        company: 'Pitch',
        company_logo: companyLogo3,
        location: 'Berlin, Germany',
        category: 'Marketing',
        type: 'Full Time',
        description: 'Pitch is looking for a Customer Success Manager to champion our customers\' goals and ensure long-term retention. You\'ll onboard new users, deliver product training, and surface insights to the product team.',
        tags: ['Marketing'],
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 4,
        title: 'Visual Designer',
        company: 'Blinklist',
        company_logo: companyLogo4,
        location: 'Granada, Spain',
        category: 'Design',
        type: 'Full Time',
        description: 'Blinklist is looking for a Visual Designer to bring our reading experience to life. You\'ll design illustrations, icons, and marketing materials that resonate with millions of readers.',
        tags: ['Design'],
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 5,
        title: 'Product Designer',
        company: 'ClassPass',
        company_logo: companyLogo5,
        location: 'Manchester, UK',
        category: 'Design',
        type: 'Full Time',
        description: 'ClassPass is seeking a Product Designer to improve the experience for millions of fitness enthusiasts. You\'ll lead end-to-end design for key product areas — from discovery and booking to user retention.',
        tags: ['Design', 'Marketing'],
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 6,
        title: 'Lead Designer',
        company: 'Canva',
        company_logo: companyLogo6,
        location: 'Ontario, Canada',
        category: 'Design',
        type: 'Full Time',
        description: 'Canva is looking for a Lead Designer to shape the future of visual communication tools. You\'ll mentor a team of designers, define design language, and drive strategic initiatives across product and brand.',
        tags: ['Design', 'Business'],
        created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 7,
        title: 'Brand Strategist',
        company: 'GoDaddy',
        company_logo: companyLogo7,
        location: 'Marseille, France',
        category: 'Marketing',
        type: 'Full Time',
        description: 'GoDaddy is seeking a Brand Strategist to craft narratives that resonate with entrepreneurs and small business owners globally. You\'ll analyze market trends and define positioning.',
        tags: ['Marketing'],
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 8,
        title: 'Data Analyst',
        company: 'Twitter',
        company_logo: companyLogo8,
        location: 'San Diego, US',
        category: 'Technology',
        type: 'Full Time',
        description: 'Twitter is looking for a Data Analyst to transform complex datasets into actionable insights. You\'ll partner with product, engineering, and marketing teams to measure performance and identify trends.',
        tags: ['Technology'],
        created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 9,
        title: 'Social Media Manager',
        company: 'Nomad',
        company_logo: latestLogo1,
        location: 'Paris, France',
        category: 'Marketing',
        type: 'Full Time',
        description: 'Nomad is looking for a Social Media Manager to grow our community across Instagram, LinkedIn, and TikTok.',
        tags: ['Marketing', 'Design'],
        created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 10,
        title: 'DevOps Engineer',
        company: 'Netlify',
        company_logo: latestLogo2,
        location: 'Remote',
        category: 'Engineering',
        type: 'Remote',
        description: 'Netlify is looking for a DevOps Engineer to scale our deployment infrastructure serving millions of developers.',
        tags: ['Engineering', 'Technology'],
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 11,
        title: 'Brand Designer',
        company: 'Maze',
        company_logo: latestLogo3,
        location: 'San Francisco, US',
        category: 'Design',
        type: 'Full Time',
        description: 'Maze is looking for a Brand Designer to evolve our visual identity as we scale from startup to category leader.',
        tags: ['Marketing', 'Design'],
        created_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 12,
        title: 'Frontend Developer',
        company: 'Terraform',
        company_logo: latestLogo4,
        location: 'Hamburg, Germany',
        category: 'Engineering',
        type: 'Full Time',
        description: 'Terraform Labs is looking for a Frontend Developer to build highly interactive web applications using React, TypeScript, and GraphQL.',
        tags: ['Engineering', 'Technology'],
        created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 13,
        title: 'Full Stack Developer',
        company: 'Udacity',
        company_logo: latestLogo5,
        location: 'Remote',
        category: 'Technology',
        type: 'Remote',
        description: 'Udacity is seeking a Full Stack Developer to help build and scale our e-learning platform.',
        tags: ['Technology', 'Engineering'],
        created_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 14,
        title: 'HR Manager',
        company: 'Packer',
        company_logo: latestLogo6,
        location: 'Lucerne, Switzerland',
        category: 'Human Resource',
        type: 'Full Time',
        description: 'Packer is looking for an HR Manager to lead talent acquisition, performance management, and employee engagement initiatives.',
        tags: ['Human Resource', 'Business'],
        created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 15,
        title: 'People Operations Lead',
        company: 'Webflow',
        company_logo: latestLogo7,
        location: 'Remote',
        category: 'Human Resource',
        type: 'Remote',
        description: 'Webflow is hiring a People Operations Lead to build world-class employee experiences across our fully remote team.',
        tags: ['Human Resource', 'Business'],
        created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 16,
        title: 'UX Researcher',
        company: 'Figma',
        company_logo: latestLogo8,
        location: 'New York, US',
        category: 'Design',
        type: 'Full Time',
        description: 'Figma is seeking a UX Researcher to uncover deep user insights and help shape the future of collaborative design tools.',
        tags: ['Design', 'Technology'],
        created_at: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    },
];

export const categories = [
    { name: 'Design', count: 235 },
    { name: 'Sales', count: 756 },
    { name: 'Marketing', count: 140 },
    { name: 'Finance', count: 325 },
    { name: 'Technology', count: 436 },
    { name: 'Engineering', count: 542 },
    { name: 'Business', count: 211 },
    { name: 'Human Resource', count: 346 },
];

export const locations = [
    'Remote',
    'New York, US',
    'San Francisco, US',
    'London, UK',
    'Berlin, Germany',
    'Paris, France',
    'Madrid, Spain',
    'Toronto, Canada',
];

/** Returns a human-friendly time-ago string */
export function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 7) return `${days} days ago`;
    const weeks = Math.floor(days / 7);
    if (weeks === 1) return '1 week ago';
    if (weeks < 5) return `${weeks} weeks ago`;
    const months = Math.floor(days / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
}

export const COMPANY_LOGO_MAP = {
    // ── Original 16 (mockJobs) ──────────────────────
    'Revolut': companyLogo1,
    'Dropbox': companyLogo2,
    'Pitch': companyLogo3,
    'Blinklist': companyLogo4,
    'Blinkist': companyLogo4,
    'ClassPass': companyLogo5,
    'Canva': companyLogo6,
    'GoDaddy': companyLogo7,
    'Twitter': companyLogo8,
    'Nomad': latestLogo1,
    'Netlify': latestLogo2,
    'Maze': latestLogo3,
    'Terraform': latestLogo4,
    'Udacity': latestLogo5,
    'Packer': latestLogo6,
    'Webflow': latestLogo7,
    'Figma': latestLogo8,

    // ── Engineering (seeded) ────────────────────────
    'Vercel': companyLogo1,
    'Cloudflare': companyLogo2,
    'GitHub': companyLogo3,

    // ── Finance (seeded) ────────────────────────────
    'Stripe': companyLogo4,
    'Shopify': companyLogo5,
    'PayPal': companyLogo6,
    'Coinbase': companyLogo7,

    // ── Sales (seeded) ──────────────────────────────
    'Salesforce': companyLogo8,
    'HubSpot': latestLogo1,
    'Notion': latestLogo2,
    'Zoom': latestLogo3,

    // ── Business (seeded) ───────────────────────────
    'Atlassian': latestLogo4,
    'McKinsey': latestLogo5,
    'Airbnb': latestLogo6,
    'Spotify': latestLogo7,

    // ── Human Resource (seeded) ─────────────────────
    'Linear': latestLogo8,
    'Intercom': companyLogo1,
    'Buffer': companyLogo2,
};
