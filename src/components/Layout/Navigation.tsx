import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { colours, radii } from '../../theme/tokens';

const Navigation: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      text: 'Card Sort',
      icon: <ViewModuleIcon />,
      path: '/card-sort',
    },
    {
      text: 'Tree Testing',
      icon: <AccountTreeIcon />,
      path: '/tree-test',
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        width: 240,
        borderRadius: 0,
        height: '100%',
        borderRight: `1px solid ${colours.neutral.divider}`,
        backgroundColor: colours.neutral.white,
      }}
    >
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === '/card-sort' && location.pathname === '/');
          
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1, px: 2 }}>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                selected={isActive}
                sx={{
                  borderRadius: radii.medium,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(33, 150, 243, 0.08)',
                    '&:hover': {
                      backgroundColor: 'rgba(33, 150, 243, 0.12)',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 40,
                  color: isActive ? colours.primary.main : colours.neutral.text.secondary 
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? colours.primary.main : colours.neutral.text.primary
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default Navigation;

