import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Stack, 
  Typography, 
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { TreeTask, TreeNode } from '../../types';
import { colours, radii } from '../../theme/tokens';
import { SecondaryButton } from '../common/Button';

interface TaskBuilderProps {
  tasks: TreeTask[];
  tree: TreeNode[];
  onChange: (tasks: TreeTask[]) => void;
}

const TaskBuilder: React.FC<TaskBuilderProps> = ({ tasks, tree, onChange }) => {
  const [question, setQuestion] = useState('');
  const [correctNodeId, setCorrectNodeId] = useState('');

  // Flatten tree to get all possible correct nodes
  const getAllNodes = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.reduce((acc: TreeNode[], node) => {
      acc.push(node);
      if (node.children) {
        acc.push(...getAllNodes(node.children));
      }
      return acc;
    }, []);
  };

  const allNodes = getAllNodes(tree);

  const handleAddTask = () => {
    if (!question.trim() || !correctNodeId) return;

    const newTask: TreeTask = {
      id: `task-${Date.now()}`,
      question,
      correctNodeId,
    };

    onChange([...tasks, newTask]);
    setQuestion('');
    setCorrectNodeId('');
  };

  const handleDeleteTask = (taskId: string) => {
    onChange(tasks.filter(t => t.id !== taskId));
  };

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3, borderRadius: radii.large, border: `1px solid ${colours.neutral.divider}` }}>
        <Typography variant="h6" gutterBottom>Tasks</Typography>
        <Stack direction="column" spacing={2} mb={3}>
          <TextField
            label="Task Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Correct Answer</InputLabel>
              <Select
                value={correctNodeId}
                label="Correct Answer"
                onChange={(e) => setCorrectNodeId(e.target.value)}
              >
                {allNodes.map((node) => (
                  <MenuItem key={node.id} value={node.id}>
                    {node.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <SecondaryButton 
              onClick={handleAddTask}
              disabled={!question.trim() || !correctNodeId}
              sx={{ minWidth: '120px' }}
            >
              <AddIcon fontSize="small" sx={{ mr: 1 }} />
              Add Task
            </SecondaryButton>
          </Stack>
        </Stack>

        <List>
          {tasks.map((task, index) => {
            const correctNode = allNodes.find(n => n.id === task.correctNodeId);
            return (
              <ListItem
                key={task.id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDeleteTask(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
                sx={{ 
                  border: `1px solid ${colours.neutral.divider}`, 
                  borderRadius: radii.medium,
                  mb: 1 
                }}
              >
                <ListItemText
                  primary={`Task ${index + 1}: ${task.question}`}
                  secondary={`Correct Answer: ${correctNode?.label || 'Unknown Node'}`}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Stack>
  );
};

export default TaskBuilder;

