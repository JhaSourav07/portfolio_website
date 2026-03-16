import { PortfolioNode, PortfolioLink } from '@/types/graph';

export const ALL_NODES: PortfolioNode[] = [
  // ─── Genesis ────────────────────────────────────────────────────────────────
  {
    id: 'genesis',
    label: 'Sourav Jha',
    type: 'genesis',
    visible: true,
    emoji: '⬡',
    color: '#7c3aed',
    size: 28,
    content: {
      subtitle: 'Full Stack Developer | Web3 Explorer',
      intro:
        'Building backend systems, automation tools, web apps, and exploring the decentralized frontier of blockchain development.',
      socialLinks: {
        github: 'https://github.com/JhaSourav07',
        linkedin: 'https://linkedin.com/in/souravjhahind',
        email: 'mailto:souravkjha2007@gmail.com',
      },
    },
  },

  // ─── Main Nodes ─────────────────────────────────────────────────────────────
  {
    id: 'projects',
    label: 'Projects',
    type: 'main',
    visible: false,
    emoji: '◈',
    color: '#06b6d4',
    size: 20,
    content: {
      description: 'A network of projects spanning full-stack apps, backend systems, Web3 protocols, and automation tools.',
    },
  },
  {
    id: 'skills',
    label: 'Skills',
    type: 'main',
    visible: false,
    emoji: '◆',
    color: '#10b981',
    size: 20,
    content: {
      description: 'Technologies and tools across the full development spectrum — from frontend to smart contracts.',
    },
  },
  {
    id: 'experience',
    label: 'Experience',
    type: 'main',
    visible: false,
    emoji: '◉',
    color: '#f59e0b',
    size: 20,
    content: {
      description: 'The journey of growth — from learning full-stack fundamentals to exploring decentralized systems.',
    },
  },
  {
    id: 'contact',
    label: 'Contact',
    type: 'main',
    visible: false,
    emoji: '◎',
    color: '#ec4899',
    size: 20,
    content: {
      description: "Let's connect and build something great together.",
    },
  },

  // ─── Project Nodes ──────────────────────────────────────────────────────────
  {
    id: 'proj-anuvaad',
    label: 'Anuvaad',
    type: 'project',
    parentId: 'projects',
    category: 'fullstack',
    visible: false,
    emoji: '📱',
    color: '#8b5cf6',
    size: 13,
    content: {
      project: {
        name: 'Anuvaad',
        description: 'Using Flutter',
        techStack: ['Flutter'],
        github: 'https://github.com/JhaSourav07/Anuvaad',
        category: 'fullstack',
      },
    },
  },
  {
    id: 'proj-stromin',
    label: 'Stromin',
    type: 'project',
    parentId: 'projects',
    category: 'fullstack',
    visible: false,
    emoji: '⚡',
    color: '#22c55e',
    size: 13,
    content: {
      project: {
        name: 'Stromin',
        description: 'Using flutter and mern backend',
        techStack: ['Flutter', 'MongoDB', 'Express', 'React', 'Node.js'],
        github: 'https://github.com/JhaSourav07/stromin',
        category: 'fullstack',
      },
    },
  },
  {
    id: 'proj-cryptopulse',
    label: 'CryptoPulse',
    type: 'project',
    parentId: 'projects',
    category: 'fullstack',
    visible: false,
    emoji: '📈',
    color: '#3b82f6',
    size: 13,
    content: {
      project: {
        name: 'CryptoPulse',
        description: 'Flutter',
        techStack: ['Flutter'],
        github: 'https://github.com/JhaSourav07/CryptoPulse',
        category: 'fullstack',
      },
    },
  },
  {
    id: 'proj-tictaktoe',
    label: 'TicTakToe',
    type: 'project',
    parentId: 'projects',
    category: 'fullstack',
    visible: false,
    emoji: '🎮',
    color: '#ef4444',
    size: 13,
    content: {
      project: {
        name: 'TicTakToe Game',
        description: 'Flutter and firebase',
        techStack: ['Flutter', 'Firebase'],
        github: 'https://github.com/JhaSourav07/ticTakToe',
        category: 'fullstack',
      },
    },
  },

  // ─── Skill Nodes ────────────────────────────────────────────────────────────
  // Frontend
  {
    id: 'skill-react', label: 'React', type: 'skill', parentId: 'skills', category: 'frontend',
    visible: false, emoji: '◆', color: '#22d3ee', size: 11,
    content: { skill: { name: 'React', category: 'frontend', level: 'advanced' } },
  },
  {
    id: 'skill-nextjs', label: 'Next.js', type: 'skill', parentId: 'skills', category: 'frontend',
    visible: false, emoji: '◆', color: '#22d3ee', size: 11,
    content: { skill: { name: 'Next.js', category: 'frontend', level: 'advanced' } },
  },
  {
    id: 'skill-tailwind', label: 'Tailwind CSS', type: 'skill', parentId: 'skills', category: 'frontend',
    visible: false, emoji: '◆', color: '#22d3ee', size: 11,
    content: { skill: { name: 'Tailwind CSS', category: 'frontend', level: 'advanced' } },
  },
  {
    id: 'skill-typescript', label: 'TypeScript', type: 'skill', parentId: 'skills', category: 'frontend',
    visible: false, emoji: '◆', color: '#22d3ee', size: 11,
    content: { skill: { name: 'TypeScript', category: 'frontend', level: 'intermediate' } },
  },
  // Backend
  {
    id: 'skill-nodejs', label: 'Node.js', type: 'skill', parentId: 'skills', category: 'backend',
    visible: false, emoji: '◆', color: '#34d399', size: 11,
    content: { skill: { name: 'Node.js', category: 'backend', level: 'advanced' } },
  },
  {
    id: 'skill-express', label: 'Express', type: 'skill', parentId: 'skills', category: 'backend',
    visible: false, emoji: '◆', color: '#34d399', size: 11,
    content: { skill: { name: 'Express', category: 'backend', level: 'advanced' } },
  },
  {
    id: 'skill-python', label: 'Python', type: 'skill', parentId: 'skills', category: 'backend',
    visible: false, emoji: '◆', color: '#34d399', size: 11,
    content: { skill: { name: 'Python', category: 'backend', level: 'intermediate' } },
  },
  // Web3
  {
    id: 'skill-solidity', label: 'Solidity', type: 'skill', parentId: 'skills', category: 'web3',
    visible: false, emoji: '◆', color: '#c084fc', size: 11,
    content: { skill: { name: 'Solidity', category: 'web3', level: 'intermediate' } },
  },
  {
    id: 'skill-hardhat', label: 'Hardhat', type: 'skill', parentId: 'skills', category: 'web3',
    visible: false, emoji: '◆', color: '#c084fc', size: 11,
    content: { skill: { name: 'Hardhat', category: 'web3', level: 'intermediate' } },
  },
  {
    id: 'skill-ethersjs', label: 'Ethers.js', type: 'skill', parentId: 'skills', category: 'web3',
    visible: false, emoji: '◆', color: '#c084fc', size: 11,
    content: { skill: { name: 'Ethers.js', category: 'web3', level: 'intermediate' } },
  },
  // Tools
  {
    id: 'skill-docker', label: 'Docker', type: 'skill', parentId: 'skills', category: 'tools',
    visible: false, emoji: '◆', color: '#fb923c', size: 11,
    content: { skill: { name: 'Docker', category: 'tools', level: 'intermediate' } },
  },
  {
    id: 'skill-git', label: 'Git', type: 'skill', parentId: 'skills', category: 'tools',
    visible: false, emoji: '◆', color: '#fb923c', size: 11,
    content: { skill: { name: 'Git', category: 'tools', level: 'advanced' } },
  },
  {
    id: 'skill-linux', label: 'Linux', type: 'skill', parentId: 'skills', category: 'tools',
    visible: false, emoji: '◆', color: '#fb923c', size: 11,
    content: { skill: { name: 'Linux', category: 'tools', level: 'intermediate' } },
  },

  // ─── Experience Items ────────────────────────────────────────────────────────
  {
    id: 'exp-coming-soon',
    label: 'Journey Updates',
    type: 'experience-item',
    parentId: 'experience',
    visible: false,
    emoji: '◉',
    color: '#fbbf24',
    size: 13,
    content: {
      experience: {
        title: 'Experience Details Coming Soon',
        period: 'Present',
        description:
          'I am currently compiling my professional timeline and experience details. Check back soon for updates.',
      },
    },
  },

  // ─── Contact Items ───────────────────────────────────────────────────────────
  {
    id: 'contact-github',
    label: 'GitHub',
    type: 'contact-item',
    parentId: 'contact',
    visible: false,
    emoji: '◎',
    color: '#f472b6',
    size: 13,
    content: {
      contact: {
        label: 'GitHub',
        value: '@JhaSourav07',
        href: 'https://github.com/JhaSourav07',
        icon: 'github',
      },
    },
  },
  {
    id: 'contact-linkedin',
    label: 'LinkedIn',
    type: 'contact-item',
    parentId: 'contact',
    visible: false,
    emoji: '◎',
    color: '#f472b6',
    size: 13,
    content: {
      contact: {
        label: 'LinkedIn',
        value: 'Sourav Jha',
        href: 'https://linkedin.com/in/souravjhahind',
        icon: 'linkedin',
      },
    },
  },
  {
    id: 'contact-email',
    label: 'Email',
    type: 'contact-item',
    parentId: 'contact',
    visible: false,
    emoji: '◎',
    color: '#f472b6',
    size: 13,
    content: {
      contact: {
        label: 'Email',
        value: 'souravkjha2007@gmail.com',
        href: 'mailto:souravkjha2007@gmail.com',
        icon: 'mail',
      },
    },
  },
];

export const ALL_LINKS: PortfolioLink[] = [
  // Genesis → Main
  { source: 'genesis', target: 'projects', animated: true },
  { source: 'genesis', target: 'skills', animated: true },
  { source: 'genesis', target: 'experience', animated: true },
  { source: 'genesis', target: 'contact', animated: true },

  // Projects → sub-projects
  { source: 'projects', target: 'proj-anuvaad' },
  { source: 'projects', target: 'proj-stromin' },
  { source: 'projects', target: 'proj-cryptopulse' },
  { source: 'projects', target: 'proj-tictaktoe' },

  // Skills → skill nodes
  { source: 'skills', target: 'skill-react' },
  { source: 'skills', target: 'skill-nextjs' },
  { source: 'skills', target: 'skill-tailwind' },
  { source: 'skills', target: 'skill-typescript' },
  { source: 'skills', target: 'skill-nodejs' },
  { source: 'skills', target: 'skill-express' },
  { source: 'skills', target: 'skill-python' },
  { source: 'skills', target: 'skill-solidity' },
  { source: 'skills', target: 'skill-hardhat' },
  { source: 'skills', target: 'skill-ethersjs' },
  { source: 'skills', target: 'skill-docker' },
  { source: 'skills', target: 'skill-git' },
  { source: 'skills', target: 'skill-linux' },

  // Experience → items
  { source: 'experience', target: 'exp-coming-soon' },

  // Contact → items
  { source: 'contact', target: 'contact-github' },
  { source: 'contact', target: 'contact-linkedin' },
  { source: 'contact', target: 'contact-email' },
];

export const MAIN_NODE_IDS = ['projects', 'skills', 'experience', 'contact'];

export const CATEGORY_COLORS: Record<string, string> = {
  fullstack: '#8b5cf6',
  backend: '#6366f1',
  web3: '#a855f7',
  tools: '#0ea5e9',
  frontend: '#22d3ee',
  advanced: '#10b981',
  intermediate: '#f59e0b',
  beginner: '#6b7280',
};
