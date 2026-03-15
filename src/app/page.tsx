'use client';

import dynamic from 'next/dynamic';
import { useGraphState } from '@/hooks/useGraphState';
import InfoPanel from '@/components/InfoPanel';
import HUD from '@/components/HUD';
import BackgroundGrid from '@/components/BackgroundGrid';
import type { ComponentProps } from 'react';
import type NodeNetworkType from '@/components/NodeNetwork';

const NodeNetwork = dynamic<ComponentProps<typeof NodeNetworkType>>(
  () => import('@/components/NodeNetwork'),
  { ssr: false }
);

export default function Home() {
  const {
    visibleNodes,
    visibleLinks,
    selectedNode,
    genesisClicked,
    expandedNodes,
    handleNodeClick,
    closePanel,
  } = useGraphState();

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#050510]">
      {/* Animated background */}
      <BackgroundGrid />

      {/* Force graph network */}
      <div className="absolute inset-0 z-10">
        <NodeNetwork
          nodes={visibleNodes}
          links={visibleLinks}
          onNodeClick={handleNodeClick}
          selectedNode={selectedNode}
          genesisClicked={genesisClicked}
        />
      </div>

      {/* HUD overlay */}
      <div className="pointer-events-none z-30">
        <HUD genesisClicked={genesisClicked} selectedNode={selectedNode} />
      </div>

      {/* Info panel */}
      <div className="z-50">
        <InfoPanel node={selectedNode} onClose={closePanel} />
      </div>
    </main>
  );
}
