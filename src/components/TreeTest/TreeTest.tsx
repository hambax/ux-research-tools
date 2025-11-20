import React, { useState } from 'react';
import { Box, Typography, Tab, Tabs, Stack } from '@mui/material';
import TreeBuilder from './TreeBuilder';
import TaskBuilder from './TaskBuilder';
import TestPreview from './TestPreview';
import { TreeNode, TreeTask } from '../../types';
import { colours } from '../../theme/tokens';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const TreeTest: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [tree, setTree] = useState<TreeNode[]>([
    {
      id: 'root-1',
      label: 'Home',
      children: [
        { id: 'node-1', label: 'About Us', children: [] },
        { id: 'node-2', label: 'Products', children: [] },
        { id: 'node-3', label: 'Contact', children: [] },
      ],
    },
  ]);
  const [tasks, setTasks] = useState<TreeTask[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight={600} color={colours.neutral.text.primary} mb={3}>
        Tree Testing Tool
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Build Tree" />
          <Tab label="Define Tasks" />
          <Tab label="Preview Test" />
        </Tabs>
      </Box>

      <CustomTabPanel value={tabValue} index={0}>
        <Stack spacing={3} maxWidth="md">
          <Typography variant="body1" color="text.secondary">
            Build your navigation tree structure here. Add, remove, and nest items to match your information architecture.
          </Typography>
          <TreeBuilder tree={tree} onChange={setTree} />
        </Stack>
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={1}>
         <Stack spacing={3} maxWidth="md">
          <Typography variant="body1" color="text.secondary">
            Create tasks for your participants to complete. Each task should have a question and a correct destination node.
          </Typography>
          <TaskBuilder tasks={tasks} tree={tree} onChange={setTasks} />
        </Stack>
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2}>
        <Stack spacing={3} maxWidth="md">
          <TestPreview tree={tree} tasks={tasks} />
        </Stack>
      </CustomTabPanel>
    </Box>
  );
};

export default TreeTest;
