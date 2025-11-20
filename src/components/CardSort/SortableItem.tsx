import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { Paper, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  isDragging?: boolean;
  onDelete?: (id: string) => void;
}

export const SortableItem: React.FC<SortableItemProps> = ({ 
  id, 
  children,
  isDragging = false,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition: dragTransition,
  } = useSortable({ id });

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        position: 'relative',
        p: '16px',
        cursor: 'grab',
        backgroundColor: isDragging ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(8px)',
        borderRadius: 1.5,
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: isDragging 
          ? '0 8px 16px rgba(0, 0, 0, 0.1)' 
          : '0 2px 4px rgba(0, 0, 0, 0.03)',
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.06)',
          transform: 'translateY(-1px)',
          '& .delete-button': {
            opacity: 1,
            visibility: 'visible',
          },
        },
      }}
      {...attributes}
      {...listeners}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
        <Typography sx={{ fontSize: 16, lineHeight: 1.3, flex: 1 }}>
          {children}
        </Typography>
        {onDelete && (
          <IconButton
            className="delete-button"
            size="small"
            onClick={(e) => {
              e.stopPropagation(); // Prevent drag start
              onDelete(id);
            }}
            onPointerDown={(e) => e.stopPropagation()} // Prevent drag start on pointer down
            sx={{
              opacity: 0,
              visibility: 'hidden',
              transition: 'all 0.2s ease',
              padding: 0.5,
              color: 'text.secondary',
              '&:hover': {
                color: 'error.main',
                backgroundColor: 'rgba(211, 47, 47, 0.08)',
              },
            }}
          >
            <CloseIcon fontSize="small" sx={{ fontSize: '1.1rem' }} />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};
