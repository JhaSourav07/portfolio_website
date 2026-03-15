'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { PortfolioNode, PortfolioLink } from '@/types/graph';

// Dynamically import to avoid SSR issues with canvas
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

interface NodeNetworkProps {
  nodes: PortfolioNode[];
  links: PortfolioLink[];
  onNodeClick: (node: PortfolioNode) => void;
  selectedNode: PortfolioNode | null;
  genesisClicked: boolean;
}

const NODE_COLORS: Record<string, string> = {
  genesis: '#7c3aed',
  main: '#6366f1',
  project: '#06b6d4',
  skill: '#10b981',
  'experience-item': '#f59e0b',
  'contact-item': '#ec4899',
};

function drawNode(
  node: PortfolioNode,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
  isHovered: boolean,
  isSelected: boolean
) {
  const { x = 0, y = 0, type, label, size = 14 } = node;
  const color = node.color || NODE_COLORS[type] || '#6366f1';
  
  // Base scale boost to make nodes more prominent
  const baseSize = size * 1.25;
  const r = baseSize / globalScale;
  const fontSize = Math.max(12, 16 / globalScale);
  const glowScale = isSelected ? 1.6 : isHovered ? 1.4 : 1.1;

  // 1. Ambient Background Glow
  const glowR = r * glowScale * 2.8;
  const gradient = ctx.createRadialGradient(x, y, r * 0.2, x, y, glowR);
  gradient.addColorStop(0, color + 'cc');
  gradient.addColorStop(0.4, color + '55');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.beginPath();
  ctx.arc(x, y, glowR, 0, 2 * Math.PI);
  ctx.fillStyle = gradient;
  ctx.fill();

  // 2. Outer Glass Node Ring
  ctx.beginPath();
  ctx.arc(x, y, r * glowScale * 1.15, 0, 2 * Math.PI);
  ctx.strokeStyle = color + (isSelected ? 'ff' : isHovered ? 'ee' : '88');
  ctx.lineWidth = (isSelected ? 2.5 : 1.5) / globalScale;
  ctx.stroke();

  // 3. Inner Vibrant Gradient Core
  ctx.beginPath();
  ctx.arc(x, y, r * glowScale, 0, 2 * Math.PI);
  const innerGradient = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
  innerGradient.addColorStop(0, color + 'dd');
  innerGradient.addColorStop(1, color + '33');
  ctx.fillStyle = innerGradient;
  ctx.fill();

  // Overlay white shine border for depth
  ctx.strokeStyle = '#ffffff66';
  ctx.lineWidth = 1 / globalScale;
  ctx.stroke();

  // 4. Dark Eye Center
  ctx.beginPath();
  ctx.arc(x, y, r * glowScale * 0.35, 0, 2 * Math.PI);
  ctx.fillStyle = '#0f172aee';
  ctx.fill();

  // 5. Typography Rendering
  ctx.font = `${type === 'genesis' ? 'bold ' : '600 '}${fontSize}px 'Space Grotesk', sans-serif`;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Drop shadow for high contrast text
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 6 / globalScale;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2 / globalScale;
  
  ctx.fillText(label, x, y + r * glowScale + fontSize * 1.6);
  
  // Reset shadow
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Genesis: hash ID underneath
  if (type === 'genesis') {
    ctx.font = `${Math.max(8, 11 / globalScale)}px 'JetBrains Mono', monospace`;
    ctx.fillStyle = '#a78bfa';
    ctx.fillText('#0x0000...genesis', x, y + r * glowScale + fontSize * 3.0);
  }
}

export default function NodeNetwork({
  nodes,
  links,
  onNodeClick,
  selectedNode,
  genesisClicked,
}: NodeNetworkProps) {
  const graphRef = useRef<any>(null);
  const [hoveredNode, setHoveredNode] = useState<PortfolioNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Zoom to selected node
  useEffect(() => {
    if (selectedNode && graphRef.current) {
      const node = nodes.find((n) => n.id === selectedNode.id);
      if (node?.x !== undefined && node?.y !== undefined) {
        setTimeout(() => {
          graphRef.current?.centerAt(node.x, node.y, 800);
          // Changed zoom to pull out further allowing the gigantic network to fit on screen
          graphRef.current?.zoom(selectedNode.type === 'genesis' ? 0.8 : 1.15, 800);
        }, 100);
      }
    }
  }, [selectedNode, nodes]);

  // Center on genesis at start
  useEffect(() => {
    setTimeout(() => {
      graphRef.current?.centerAt(0, 0, 1000);
      graphRef.current?.zoom(0.9, 1000);
    }, 500);
  }, []);

  // Apply Extreme Simulation Forces dynamically
  useEffect(() => {
    if (graphRef.current) {
      const charge = graphRef.current.d3Force('charge');
      if (charge) {
        // Massive repulsion to throw nodes to the edges of the screen
        charge.strength(-3500); 
        charge.distanceMax(4000);
      }
      const link = graphRef.current.d3Force('link');
      if (link) {
        // Extremely long links so clusters don't overlap
        link.distance(400); 
      }
      // Re-warm the simulation so the new extreme physics take over immediately
      graphRef.current.d3ReheatSimulation();
    }
  }, [nodes.length]);

  const nodeCanvasObject = useCallback(
    (node: object, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const n = node as PortfolioNode;
      const isHovered = hoveredNode?.id === n.id;
      const isSelected = selectedNode?.id === n.id;
      drawNode(n, ctx, globalScale, isHovered, isSelected);
    },
    [hoveredNode, selectedNode]
  );

  const linkColor = useCallback(
    (link: object) => {
      const l = link as PortfolioLink;
      const src = typeof l.source === 'string' ? l.source : (l.source as PortfolioNode).id;
      const tgt = typeof l.target === 'string' ? l.target : (l.target as PortfolioNode).id;
      if (
        selectedNode &&
        (src === selectedNode.id || tgt === selectedNode.id)
      ) {
        return '#7c3aedcc';
      }
      return '#6366f12a';
    },
    [selectedNode]
  );

  const linkWidth = useCallback(
    (link: object) => {
      const l = link as PortfolioLink;
      const src = typeof l.source === 'string' ? l.source : (l.source as PortfolioNode).id;
      const tgt = typeof l.target === 'string' ? l.target : (l.target as PortfolioNode).id;
      if (selectedNode && (src === selectedNode.id || tgt === selectedNode.id)) return 2.5;
      return 1.2;
    },
    [selectedNode]
  );

  const handleNodeHover = useCallback((node: object | null) => {
    setHoveredNode(node as PortfolioNode | null);
    document.body.style.cursor = node ? 'pointer' : 'default';
  }, []);

  const handleClick = useCallback(
    (node: object) => {
      onNodeClick(node as PortfolioNode);
    },
    [onNodeClick]
  );

  const graphData = { nodes, links };

  return (
    <div className="absolute inset-0">
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="transparent"
        nodeCanvasObject={nodeCanvasObject}
        nodeCanvasObjectMode={() => 'replace'}
        nodePointerAreaPaint={(node: object, color: string, ctx: CanvasRenderingContext2D, globalScale: number) => {
          const n = node as PortfolioNode;
          const r = (((n.size ?? 14) * 1.25) / globalScale) * 2;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(n.x ?? 0, n.y ?? 0, r, 0, 2 * Math.PI);
          ctx.fill();
        }}
        onNodeClick={handleClick}
        onNodeHover={handleNodeHover}
        linkColor={linkColor}
        linkWidth={linkWidth}
        linkDirectionalParticles={(link: object) => {
          const l = link as PortfolioLink;
          const src = typeof l.source === 'string' ? l.source : (l.source as PortfolioNode).id;
          const tgt = typeof l.target === 'string' ? l.target : (l.target as PortfolioNode).id;
          return genesisClicked && (src === 'genesis' || tgt === 'genesis') ? 4 : 0;
        }}
        linkDirectionalParticleWidth={2.5}
        linkDirectionalParticleColor={() => '#a855f7'}
        linkDirectionalParticleSpeed={0.008}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        cooldownTime={3000}
        nodeLabel={() => ''}
      />
    </div>
  );
}
