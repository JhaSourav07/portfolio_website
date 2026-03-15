export type NodeType = 'genesis' | 'main' | 'project' | 'skill' | 'experience-item' | 'contact-item';
export type ProjectCategory = 'fullstack' | 'backend' | 'web3' | 'tools';
export type SkillCategory = 'frontend' | 'backend' | 'web3' | 'tools';

export interface ProjectData {
  name: string;
  description: string;
  techStack: string[];
  github?: string;
  demo?: string;
  category: ProjectCategory;
}

export interface SkillData {
  name: string;
  category: SkillCategory;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export interface ExperienceItem {
  title: string;
  period: string;
  description: string;
}

export interface ContactItem {
  label: string;
  value: string;
  href: string;
  icon: string;
}

export interface NodeContent {
  subtitle?: string;
  description?: string;
  project?: ProjectData;
  skill?: SkillData;
  experience?: ExperienceItem;
  contact?: ContactItem;
  socialLinks?: { github?: string; linkedin?: string; email?: string };
  intro?: string;
}

export interface PortfolioNode {
  id: string;
  label: string;
  type: NodeType;
  category?: ProjectCategory | SkillCategory;
  visible: boolean;
  parentId?: string;
  content?: NodeContent;
  x?: number;
  y?: number;
  color?: string;
  size?: number;
  emoji?: string;
}

export interface PortfolioLink {
  source: string;
  target: string;
  highlighted?: boolean;
  animated?: boolean;
}

export interface GraphData {
  nodes: PortfolioNode[];
  links: PortfolioLink[];
}
