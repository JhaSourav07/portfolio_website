'use client';

import { useState, useCallback, useMemo } from 'react';
import { PortfolioNode, PortfolioLink } from '@/types/graph';
import { ALL_NODES, ALL_LINKS, MAIN_NODE_IDS } from '@/data/portfolioData';

export function useGraphState() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<PortfolioNode | null>(null);
  const [genesisClicked, setGenesisClicked] = useState(false);

  const visibleNodes = useMemo<PortfolioNode[]>(() => {
    return ALL_NODES.filter((node) => {
      if (node.id === 'genesis') return true;
      if (!genesisClicked) return false;
      if (MAIN_NODE_IDS.includes(node.id)) return true;
      // Sub-node: only show if its parent is expanded
      if (node.parentId && expandedNodes.has(node.parentId)) return true;
      return false;
    });
  }, [expandedNodes, genesisClicked]);

  const visibleLinks = useMemo<PortfolioLink[]>(() => {
    const visibleIds = new Set(visibleNodes.map((n) => n.id));
    return ALL_LINKS.filter((l) => {
      const src = typeof l.source === 'string' ? l.source : (l.source as PortfolioNode).id;
      const tgt = typeof l.target === 'string' ? l.target : (l.target as PortfolioNode).id;
      return visibleIds.has(src) && visibleIds.has(tgt);
    });
  }, [visibleNodes]);

  const handleNodeClick = useCallback(
    (node: PortfolioNode) => {
      if (node.id === 'genesis') {
        setGenesisClicked(true);
        setSelectedNode(node);
        return;
      }

      const isMainNode = MAIN_NODE_IDS.includes(node.id);
      if (isMainNode) {
        setExpandedNodes((prev) => {
          const next = new Set(prev);
          if (next.has(node.id)) {
            next.delete(node.id);
          } else {
            next.add(node.id);
          }
          return next;
        });
        setSelectedNode(node);
        return;
      }

      // Sub-node: just open info panel
      setSelectedNode(node);
    },
    []
  );

  const closePanel = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return {
    visibleNodes,
    visibleLinks,
    selectedNode,
    genesisClicked,
    expandedNodes,
    handleNodeClick,
    closePanel,
  };
}
