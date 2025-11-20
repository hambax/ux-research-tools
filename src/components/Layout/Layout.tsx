import React from 'react';
import { AppBar, Box, Toolbar, Typography, Drawer } from '@mui/material';
import Navigation from './Navigation';
import { colours } from '../../theme/tokens';

const DRAWER_WIDTH = 240;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: colours.neutral.background }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          ml: `${DRAWER_WIDTH}px`,
          bgcolor: colours.neutral.white,
          borderBottom: `1px solid ${colours.neutral.divider}`,
          color: colours.neutral.text.primary,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            UX Research Tools
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: `1px solid ${colours.neutral.divider}`,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: `1px solid ${colours.neutral.divider}` 
        }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            UXTools
          </Typography>
        </Toolbar>
        <Navigation />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: 8, // Toolbar height
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
