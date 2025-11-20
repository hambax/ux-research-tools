import React, { useState } from 'react';
import { Box, TextField, IconButton, Stack, Typography, Paper } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { TreeNode } from '../../types';
import { colours, spacing, radii } from '../../theme/tokens';
import { SecondaryButton } from '../common/Button';

interface TreeBuilderProps {
  tree: TreeNode[];
  onChange: (tree: TreeNode[]) => void;
}

const TreeBuilder: React.FC<TreeBuilderProps> = ({ tree, onChange }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [newNodeLabel, setNewNodeLabel] = useState('');

  const handleAddNode = () => {
    if (!newNodeLabel.trim()) return;

    const newNode: TreeNode = {
      id: `node-${Date.now()}`,
      label: newNodeLabel,
      children: [],
    };

    if (!selectedNodeId) {
      // Add to root
      onChange([...tree, newNode]);
    } else {
      // Add to selected node
      const addNodeToTree = (nodes: TreeNode[]): TreeNode[] => {
        return nodes.map(node => {
          if (node.id === selectedNodeId) {
            return {
              ...node,
              children: [...(node.children || []), newNode],
            };
          }
          if (node.children) {
            return {
              ...node,
              children: addNodeToTree(node.children),
            };
          }
          return node;
        });
      };
      onChange(addNodeToTree(tree));
    }
    setNewNodeLabel('');
  };

  const handleDeleteNode = () => {
    if (!selectedNodeId) return;

    const deleteNodeFromTree = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.filter(node => node.id !== selectedNodeId).map(node => {
        if (node.children) {
          return {
            ...node,
            children: deleteNodeFromTree(node.children),
          };
        }
        return node;
      });
    };
    onChange(deleteNodeFromTree(tree));
    setSelectedNodeId(null);
  };

  const renderTree = (nodes: TreeNode[]) => (
    nodes.map((node) => (
      <TreeItem key={node.id} itemId={node.id} label={node.label}>
        {Array.isArray(node.children) ? renderTree(node.children) : null}
      </TreeItem>
    ))
  );

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3, borderRadius: radii.large, border: `1px solid ${colours.neutral.divider}` }}>
        <Typography variant="h6" gutterBottom>Tree Structure</Typography>
        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            size="small"
            placeholder="New node label"
            value={newNodeLabel}
            onChange={(e) => setNewNodeLabel(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <SecondaryButton onClick={handleAddNode} disabled={!newNodeLabel.trim()}>
            <AddIcon fontSize="small" sx={{ mr: 1 }} />
            Add {selectedNodeId ? 'Child' : 'Root'}
          </SecondaryButton>
          <IconButton 
            onClick={handleDeleteNode} 
            disabled={!selectedNodeId}
            color="error"
            sx={{ border: `1px solid ${colours.neutral.divider}`, borderRadius: radii.medium }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
        
        <Box sx={{ minHeight: 300, border: `1px solid ${colours.neutral.divider}`, borderRadius: radii.medium, p: 2 }}>
          <SimpleTreeView
            onSelectedItemsChange={(event, itemId) => setSelectedNodeId(itemId)}
          >
            {renderTree(tree)}
          </SimpleTreeView>
        </Box>
      </Paper>
    </Stack>
  );
};

export default TreeBuilder;

