import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
} from '@mui/material';
import {
  DndContext,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { Category } from './Category';
import { AddCardDialog } from './AddCardDialog';
import { AddCategoryDialog } from './AddCategoryDialog';
import { FileUploadHandler } from './FileUploadHandler';
import ExportDialog from './ExportDialog';
import { SecondaryButton } from '../common/Button';
import { useCardSort } from './useCardSort';
import { colours, radii, spacing } from '../../theme/tokens';

const CardSort: React.FC = () => {
  const {
    items,
    setItems,
    categories,
    activeId,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleAddCard,
    handleAddCategory,
    handleDeleteCategory,
    handleDeleteItem,
  } = useCardSort();

  const [addCardDialogOpen, setAddCardDialogOpen] = useState(false);
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  return (
    <Box>
      <Stack direction="column" spacing={3} mb={4} alignItems="flex-start">
        <Typography variant="h4" component="h1" fontWeight={600} color={colours.neutral.text.primary}>
          Card Sort Study
        </Typography>
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
          <SecondaryButton onClick={() => setAddCardDialogOpen(true)}>
            Add Card
          </SecondaryButton>
          <SecondaryButton onClick={() => setAddCategoryDialogOpen(true)}>
            Add Category
          </SecondaryButton>
          <FileUploadHandler
            onImport={(newItems) => {
              setItems(newItems);
            }}
          />
          <SecondaryButton onClick={() => setExportDialogOpen(true)}>
            Export Results
          </SecondaryButton>
        </Stack>
      </Stack>

      <Box sx={{ 
        display: 'flex', 
        gap: spacing.px(3),
        flexDirection: 'row',
        alignItems: 'flex-start',
        minWidth: 0,
      }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <Paper sx={{ 
            p: 3, 
            width: '280px',
            flex: '0 0 280px',
            backgroundColor: colours.neutral.paper,
            borderRadius: radii.large,
            border: `1px solid ${colours.neutral.divider}`,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.02)',
            height: 'fit-content',
          }}>
            <Typography variant="h6" mb={2} color={colours.neutral.text.primary}>
              Items
            </Typography>
            <SortableContext
              items={items?.map(item => item?.id).filter(Boolean) || []}
              strategy={verticalListSortingStrategy}
            >
              <Stack spacing={1}>
                {items?.map(item => item && (
                  <SortableItem 
                    key={item.id} 
                    id={item.id}
                    isDragging={activeId === item.id}
                    onDelete={handleDeleteItem}
                  >
                    {item.content}
                  </SortableItem>
                ))}
              </Stack>
            </SortableContext>
          </Paper>

          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: spacing.px(3),
              flex: 1,
              minWidth: 0,
            }}
          >
            {categories?.map(category => category && (
              <Category
                key={category.id}
                category={category}
                activeId={activeId}
                onDelete={handleDeleteCategory}
                onDeleteItem={handleDeleteItem}
              />
            ))}
          </Box>
        </DndContext>
      </Box>

      <AddCardDialog
        open={addCardDialogOpen}
        onClose={() => setAddCardDialogOpen(false)}
        onAdd={handleAddCard}
      />
      <AddCategoryDialog
        open={addCategoryDialogOpen}
        onClose={() => setAddCategoryDialogOpen(false)}
        onAdd={handleAddCategory}
      />
      <ExportDialog
        open={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
        items={items}
        categories={categories}
      />
    </Box>
  );
};

export default CardSort;
