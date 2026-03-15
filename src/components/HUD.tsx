'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioNode } from '@/types/graph';

interface HUDProps {
  genesisClicked: boolean;
  selectedNode: PortfolioNode | null;
}

export default function HUD({ genesisClicked, selectedNode }: HUDProps) {
  return (
    <>
      {/* Top-left: portfolio ID */}
      <div className="fixed top-6 left-6 z-40 pointer-events-none">
        <p className="text-xs font-mono text-slate-600 tracking-widest">
          portfolio://sourav-jha/v1.0
        </p>
        <p className="text-xs font-mono text-violet-500/50 mt-0.5">
          {new Date().toISOString().split('T')[0]}
        </p>
      </div>

      {/* Top-right: status */}
      <div className="fixed top-6 right-6 z-40 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-500">node network online</span>
        </div>
        <p className="text-xs font-mono text-slate-700 text-right mt-0.5">
          {genesisClicked ? 'network expanded' : 'awaiting genesis'}
        </p>
      </div>

      {/* Bottom-center: hint */}
      <AnimatePresence>
        {!genesisClicked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center"
          >
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-8 h-8 rounded-full border border-violet-500/50 flex items-center justify-center"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />
              </motion.div>
              <p className="text-xs text-slate-500 font-mono">Click the Genesis node to begin</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-left: current node breadcrumb */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="fixed bottom-6 left-6 z-40 pointer-events-none"
          >
            <p className="text-xs font-mono text-slate-600">
              <span className="text-violet-500">/</span>
              {selectedNode.parentId && (
                <>
                  <span className="text-slate-500">{selectedNode.parentId}</span>
                  <span className="text-violet-500">/</span>
                </>
              )}
              <span className="text-slate-400">{selectedNode.id}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner decoration dots */}
      {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos) => (
        <div
          key={pos}
          className={`fixed ${pos} z-40 pointer-events-none w-2 h-2`}
        >
          <div className="w-full h-0.5 bg-violet-500/20" />
          <div className="w-0.5 h-full bg-violet-500/20" />
        </div>
      ))}
    </>
  );
}
