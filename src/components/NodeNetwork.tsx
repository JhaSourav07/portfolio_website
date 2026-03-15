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
  const r = size / globalScale;
  const fontSize = Math.max(10, 12 / globalScale);
  const glowScale = isSelected ? 1.6 : isHovered ? 1.35 : 1;

  // Outer glow
  const glowR = r * glowScale * 2.2;
  const gradient = ctx.createRadialGradient(x, y, r * 0.5, x, y, glowR);
  gradient.addColorStop(0, color + 'aa');
  gradient.addColorStop(1, color + '00');
  ctx.beginPath();
  ctx.arc(x, y, glowR, 0, 2 * Math.PI);
  ctx.fillStyle = gradient;
  ctx.fill();

  // Ring
  ctx.beginPath();
  ctx.arc(x, y, r * glowScale * 1.25, 0, 2 * Math.PI);
  ctx.strokeStyle = color + (isSelected ? 'ff' : isHovered ? 'cc' : '66');
  ctx.lineWidth = (isSelected ? 2 : 1) / globalScale;
  ctx.stroke();

  // Main circle
  ctx.beginPath();
  ctx.arc(x, y, r * glowScale, 0, 2 * Math.PI);
  ctx.fillStyle = isSelected ? color : color + 'cc';
  ctx.fill();
  ctx.strokeStyle = '#ffffff33';
  ctx.lineWidth = 0.5 / globalScale;
  ctx.stroke();

  // Label
  ctx.font = `${type === 'genesis' ? 'bold ' : ''}${fontSize}px 'Space Grotesk', sans-serif`;
  ctx.fillStyle = '#e2e8f0';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x, y + r * glowScale + fontSize * 1.1);

  // Genesis: hash ID underneath
  if (type === 'genesis') {
    ctx.font = `${Math.max(7, 9 / globalScale)}px 'JetBrains Mono', monospace`;
    ctx.fillStyle = '#7c3aed88';
    ctx.fillText('#0x0000...genesis', x, y + r * glowScale + fontSize * 2.4);
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
          graphRef.current?.zoom(selectedNode.type === 'genesis' ? 1.5 : 2.2, 800);
        }, 100);
      }
    }
  }, [selectedNode, nodes]);

  // Center on genesis at start
  useEffect(() => {
    setTimeout(() => {
      graphRef.current?.centerAt(0, 0, 1000);
      graphRef.current?.zoom(1.2, 1000);
    }, 500);
  }, []);

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
        return '#7c3aedaa';
      }
      return '#6366f122';
    },
    [selectedNode]
  );

  const linkWidth = useCallback(
    (link: object) => {
      const l = link as PortfolioLink;
      const src = typeof l.source === 'string' ? l.source : (l.source as PortfolioNode).id;
      const tgt = typeof l.target === 'string' ? l.target : (l.target as PortfolioNode).id;
      if (selectedNode && (src === selectedNode.id || tgt === selectedNode.id)) return 2;
      return 0.8;
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
          const r = ((n.size ?? 14) / globalScale) * 2;
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
          return genesisClicked && (src === 'genesis' || tgt === 'genesis') ? 3 : 0;
        }}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleColor={() => '#7c3aed'}
        linkDirectionalParticleSpeed={0.006}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        cooldownTime={3000}
        nodeLabel={() => ''}
        onEngineStop={() => {
          if (graphRef.current) {
            // Adjust physics forces to spread nodes further apart
            const charge = graphRef.current.d3Force('charge');
            if (charge) {
              charge.strength(-1000); // Massive repulsion to prevent text overlap in clusters
              charge.distanceMax(1000);
            }
            const link = graphRef.current.d3Force('link');
            if (link) {
              link.distance(160); // Very long link connections
            }
          }
        }}
      />
    </div>
  );
}
