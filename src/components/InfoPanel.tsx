'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Linkedin, Mail, ExternalLink, Code2, Cpu, Globe, Wrench, Terminal, Database, Server, Compass, Blocks } from 'lucide-react';
import { PortfolioNode } from '@/types/graph';
import { CATEGORY_COLORS } from '@/data/portfolioData';

interface InfoPanelProps {
  node: PortfolioNode | null;
  onClose: () => void;
}

const CategoryIcon = ({ category, size = 16 }: { category: string; size?: number }) => {
  const icons: Record<string, React.ReactNode> = {
    frontend: <Globe size={size} />,
    backend: <Server size={size} />,
    web3: <Blocks size={size} />,
    tools: <Wrench size={size} />,
    fullstack: <Compass size={size} />,
  };
  return <>{icons[category] ?? <Terminal size={size} />}</>;
};

const LevelBar = ({ level, color }: { level: string; color: string }) => {
  const map: Record<string, number> = { beginner: 1, intermediate: 2, advanced: 3 };
  const filled = map[level] ?? 1;
  return (
    <div className="flex gap-1.5 mt-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-1.5 w-10 border border-white/5 rounded-full overflow-hidden"
          style={{ background: 'rgba(0,0,0,0.4)' }}
        >
          {i <= filled && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="h-full w-full"
              style={{ background: color, boxShadow: `0 0 8px ${color}` }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

function GenesisContent({ node }: { node: PortfolioNode }) {
  const { content } = node;
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="relative">
        <div className="absolute -inset-4 bg-violet-500/10 blur-2xl rounded-full" />
        <p className="relative text-xs font-mono text-violet-400 mb-2 uppercase tracking-[0.2em] font-medium">genesis block</p>
        <h2 className="relative text-4xl font-bold text-white tracking-tight drop-shadow-lg">{node.label}</h2>
        <p className="relative text-violet-300 font-medium mt-2 text-lg drop-shadow-md">{content?.subtitle}</p>
      </div>
      
      <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 shadow-inner">
        <p className="text-slate-300 text-sm leading-relaxed font-light">{content?.intro}</p>
      </div>

      <div className="flex flex-col gap-3 pt-2">
        {content?.socialLinks?.github && (
          <a href={content.socialLinks.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-violet-500/10 hover:border-violet-500/40 text-slate-300 hover:text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <Github size={18} className="text-violet-400 group-hover:scale-110 transition-transform" /> 
              <span className="font-medium tracking-wide text-sm">GitHub</span>
            </div>
            <ExternalLink size={14} className="text-slate-600 group-hover:text-violet-400 transition-colors" />
          </a>
        )}
        {content?.socialLinks?.linkedin && (
          <a href={content.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/40 text-slate-300 hover:text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <Linkedin size={18} className="text-blue-400 group-hover:scale-110 transition-transform" /> 
              <span className="font-medium tracking-wide text-sm">LinkedIn</span>
            </div>
            <ExternalLink size={14} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
          </a>
        )}
        {content?.socialLinks?.email && (
          <a href={content.socialLinks.email}
            className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-pink-500/10 hover:border-pink-500/40 text-slate-300 hover:text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-pink-400 group-hover:scale-110 transition-transform" /> 
              <span className="font-medium tracking-wide text-sm">Email</span>
            </div>
            <ExternalLink size={14} className="text-slate-600 group-hover:text-pink-400 transition-colors" />
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectContent({ node }: { node: PortfolioNode }) {
  const p = node.content?.project;
  if (!p) return null;
  const catColor = CATEGORY_COLORS[p.category] || '#6366f1';
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="pb-4 border-b border-white/10">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-md uppercase tracking-widest font-semibold mb-3 border"
          style={{ background: catColor + '15', color: catColor, borderColor: catColor + '30' }}
        >
          <CategoryIcon category={p.category} size={12} />
          {p.category}
        </span>
        <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">{p.name}</h2>
      </div>
      
      <p className="text-slate-300 text-sm leading-relaxed font-light">{p.description}</p>
      
      <div className="p-4 rounded-xl bg-black/20 border border-white/5">
        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-3">Tech Stack</p>
        <div className="flex flex-wrap gap-2">
          {p.techStack.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs rounded border bg-white/[0.03] text-slate-300 font-mono shadow-sm"
              style={{ borderColor: catColor + '40' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col gap-2.5 pt-2">
        {p.github && (
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/[0.05] border border-white/10 text-slate-200 hover:bg-white/10 hover:text-white transition-all text-sm font-medium shadow-sm"
          >
            <Github size={16} /> View Source Code
          </a>
        )}
        {p.demo && (
          <a href={p.demo} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white transition-all text-sm font-medium shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(0,0,0,0.4)]"
            style={{ background: `linear-gradient(135deg, ${catColor}cc, ${catColor})` }}
          >
            <ExternalLink size={16} /> Open Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

function SkillContent({ node }: { node: PortfolioNode }) {
  const s = node.content?.skill;
  if (!s) return null;
  const catColor = CATEGORY_COLORS[s.category] || '#10b981';
  
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border relative overflow-hidden"
        style={{ background: catColor + '1a', borderColor: catColor + '30' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <span style={{ color: catColor }}><CategoryIcon category={s.category} size={28} /></span>
      </div>
      
      <div>
        <span
          className="text-[10px] font-mono uppercase tracking-[0.2em]"
          style={{ color: catColor }}
        >
          {s.category}
        </span>
        <h2 className="text-3xl font-bold text-white mt-1 tracking-tight">{s.name}</h2>
      </div>

      {s.level && (
        <div className="p-5 rounded-xl bg-black/20 border border-white/5">
          <p className="text-xs text-slate-400 font-mono uppercase tracking-widest mb-1">Proficiency</p>
          <p className="text-lg font-medium capitalize text-white mb-2">{s.level}</p>
          <LevelBar level={s.level} color={catColor} />
        </div>
      )}
    </div>
  );
}

function ExperienceContent({ node }: { node: PortfolioNode }) {
  const e = node.content?.experience;
  if (!e) return null;
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
        <Database size={14} className="text-amber-400" />
        <span className="text-xs font-mono text-amber-400 tracking-wider">{e.period}</span>
      </div>
      <h2 className="text-2xl font-bold text-white tracking-tight">{e.title}</h2>
      <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-amber-600" />
        <p className="text-slate-300 text-sm leading-relaxed font-light pl-2">{e.description}</p>
      </div>
    </div>
  );
}

function ContactContent({ node }: { node: PortfolioNode }) {
  const c = node.content?.contact;
  if (!c) return null;
  const icon =
    c.icon === 'github' ? <Github size={24} /> :
    c.icon === 'linkedin' ? <Linkedin size={24} /> :
    <Mail size={24} />;
    
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <p className="text-xs font-mono text-pink-400 uppercase tracking-widest mb-2">Network Hub</p>
        <h2 className="text-3xl font-bold text-white tracking-tight">Get in Touch</h2>
      </div>
      
      <a
        href={c.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-pink-500/50 transition-all overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-pink-500/0 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="p-4 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(236,72,153,0.2)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]">
          {icon}
        </div>
        
        <div className="text-center relative z-10">
          <p className="font-bold text-lg text-white mb-1 group-hover:text-pink-100 transition-colors">{c.label}</p>
          <p className="text-sm text-pink-300/80 font-mono tracking-wide">{c.value}</p>
        </div>
        
        <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <span className="text-xs font-mono text-pink-300 tracking-widest uppercase flex items-center gap-1">
            Connect <ExternalLink size={10} />
          </span>
        </div>
      </a>
    </div>
  );
}

function MainNodeContent({ node }: { node: PortfolioNode }) {
  const nodeColor = node.color || '#6366f1';
  return (
    <div className="space-y-6 pt-4 animate-in fade-in duration-500">
      <div 
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-3xl shadow-lg border"
        style={{ background: nodeColor + '20', borderColor: nodeColor + '40', color: nodeColor }}
      >
        {node.emoji}
      </div>
      <h2 className="text-3xl font-bold text-white tracking-tight">{node.label}</h2>
      <p className="text-slate-300 text-sm leading-relaxed font-light">{node.content?.description}</p>
      
      <div className="mt-8 p-4 rounded-xl border border-dashed text-center" style={{ borderColor: nodeColor + '40', background: nodeColor + '05' }}>
        <p className="text-xs font-mono tracking-widest uppercase" style={{ color: nodeColor }}>
          Click child nodes to explore
        </p>
      </div>
    </div>
  );
}

export default function InfoPanel({ node, onClose }: InfoPanelProps) {
  const renderContent = () => {
    if (!node) return null;
    switch (node.type) {
      case 'genesis': return <GenesisContent node={node} />;
      case 'project': return <ProjectContent node={node} />;
      case 'skill': return <SkillContent node={node} />;
      case 'experience-item': return <ExperienceContent node={node} />;
      case 'contact-item': return <ContactContent node={node} />;
      default: return <MainNodeContent node={node} />;
    }
  };

  const nodeColor = node?.color || '#6366f1';

  return (
    <AnimatePresence>
      {node && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            key={node.id}
            initial={{ x: '100%', opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: '100%', opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.8 }}
            className="fixed right-0 top-0 h-full w-full max-w-[420px] z-50 pointer-events-auto shadow-[-20px_0_80px_rgba(0,0,0,0.5)]"
          >
            {/* Glass panel */}
            <div
              className="h-full flex flex-col overflow-hidden relative"
              style={{
                background: 'linear-gradient(145deg, rgba(12, 12, 28, 0.85), rgba(5, 5, 15, 0.95))',
                backdropFilter: 'blur(32px) saturate(150%)',
                WebkitBackdropFilter: 'blur(32px) saturate(150%)',
                borderLeft: `1px solid ${nodeColor}30`,
              }}
            >
              {/* Radial glow background */}
              <div 
                className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${nodeColor}, transparent 70%)`, transform: 'translate(30%, -30%)' }}
              />

              {/* Top accent bar */}
              <div className="h-1 w-full relative">
                <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${nodeColor}22, ${nodeColor}, ${nodeColor}22)` }} />
                <div className="absolute inset-0 blur-sm" style={{ background: `linear-gradient(90deg, transparent, ${nodeColor}, transparent)` }} />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 z-10">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-4 h-4 rounded-full animate-ping opacity-20" style={{ background: nodeColor }} />
                    <div className="w-2 h-2 rounded-full relative z-10" style={{ background: nodeColor, boxShadow: `0 0 10px ${nodeColor}` }} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em] font-medium">
                    {node.type === 'genesis' ? 'node link active' : 'data payload'}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Content Container */}
              <div className="flex-1 overflow-y-auto px-8 py-2 custom-scrollbar z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Details Footer */}
              <div className="px-8 py-5 mt-auto z-10 bg-black/20 border-t border-white/5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest truncate">
                    node://{node.id}
                  </p>
                  <p className="text-[10px] font-mono text-slate-600">
                    STATUS: <span style={{ color: nodeColor }}>IDLE</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

