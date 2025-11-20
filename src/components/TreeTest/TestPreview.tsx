import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { TreeNode, TreeTask } from '../../types';
import { colours, radii } from '../../theme/tokens';
import { PrimaryButton } from '../common/Button';

interface TestPreviewProps {
  tree: TreeNode[];
  tasks: TreeTask[];
}

const TestPreview: React.FC<TestPreviewProps> = ({ tree, tasks }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<{ taskId: string; selectedNodeId: string | null; isCorrect: boolean }[]>([]);

  const currentTask = tasks[currentTaskIndex];

  const handleSelectNode = (event: React.SyntheticEvent, itemId: string | null) => {
    setSelectedNodeId(itemId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedNodeId) return;

    const isCorrect = selectedNodeId === currentTask.correctNodeId;
    const newResults = [...results, { 
      taskId: currentTask.id, 
      selectedNodeId, 
      isCorrect 
    }];
    setResults(newResults);

    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
      setSelectedNodeId(null);
    } else {
      setIsFinished(true);
    }
  };

  const renderTree = (nodes: TreeNode[]) => (
    nodes.map((node) => (
      <TreeItem key={node.id} itemId={node.id} label={node.label}>
        {Array.isArray(node.children) ? renderTree(node.children) : null}
      </TreeItem>
    ))
  );

  if (tasks.length === 0) {
    return (
      <Paper sx={{ p: 3, borderRadius: radii.large, textAlign: 'center' }}>
        <Typography>Add tasks to preview the test.</Typography>
      </Paper>
    );
  }

  if (isFinished) {
    return (
      <Paper sx={{ p: 3, borderRadius: radii.large }}>
        <Typography variant="h5" gutterBottom>Test Complete</Typography>
        <Stack spacing={2}>
          {results.map((result, index) => (
            <Box key={result.taskId} sx={{ p: 2, bgcolor: result.isCorrect ? 'success.light' : 'error.light', borderRadius: radii.medium }}>
              <Typography variant="subtitle1" color="white">
                Task {index + 1}: {result.isCorrect ? 'Correct' : 'Incorrect'}
              </Typography>
            </Box>
          ))}
        </Stack>
        <Button onClick={() => {
          setIsFinished(false);
          setCurrentTaskIndex(0);
          setResults([]);
          setSelectedNodeId(null);
        }} sx={{ mt: 2 }}>
          Restart Preview
        </Button>
      </Paper>
    );
  }

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3, borderRadius: radii.large, bgcolor: colours.primary.main, color: 'white' }}>
        <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>Task {currentTaskIndex + 1} of {tasks.length}</Typography>
        <Typography variant="h5" fontWeight="medium">{currentTask.question}</Typography>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: radii.large, border: `1px solid ${colours.neutral.divider}` }}>
        <Box sx={{ minHeight: 400 }}>
          <SimpleTreeView
            onSelectedItemsChange={handleSelectNode}
          >
            {renderTree(tree)}
          </SimpleTreeView>
        </Box>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <PrimaryButton 
            onClick={handleSubmitAnswer} 
            disabled={!selectedNodeId}
          >
            Select This Answer
          </PrimaryButton>
        </Box>
      </Paper>
    </Stack>
  );
};

export default TestPreview;

