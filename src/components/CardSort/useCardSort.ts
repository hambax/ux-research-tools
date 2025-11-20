import { useState, useCallback } from 'react';
import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { CardItem, CategoryType } from '../../types';

export const useCardSort = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<CardItem[]>([
    { id: 'item-1', content: 'Home' },
    { id: 'item-2', content: 'Products' },
    { id: 'item-3', content: 'About Us' },
    { id: 'item-4', content: 'Contact' },
  ]);

  const [categories, setCategories] = useState<CategoryType[]>([
    { id: 'category-1', name: 'Navigation', items: [] },
    { id: 'category-2', name: 'Content', items: [] },
    { id: 'category-3', name: 'Footer', items: [] },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find the category being dragged over
    const overCategory = categories.find(category => 
      category.id === overId || category.items.some(item => item.id === overId)
    );
    if (!overCategory) return;

    setCategories(prevCategories => {
      // Remove item from its current location (either items list or another category)
      const activeItem = items.find(item => item.id === activeId) || 
        prevCategories.flatMap(cat => cat.items).find(item => item.id === activeId);
      
      if (!activeItem) return prevCategories;

      // Remove from items list if it's there
      setItems(prevItems => prevItems.filter(item => item.id !== activeId));

      // Remove from any category it might be in
      const updatedCategories = prevCategories.map(category => ({
        ...category,
        items: category.items.filter(item => item.id !== activeId)
      }));

      // Add to the target category
      return updatedCategories.map(category => {
        if (category.id === overCategory.id) {
          return {
            ...category,
            items: [...category.items, activeItem]
          };
        }
        return category;
      });
    });
  }, [categories, items]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // Handle reordering within the items list
    if (!categories.some(cat => cat.items.some(item => item.id === overId))) {
      setItems(items => {
        const oldIndex = items.findIndex(item => item.id === activeId);
        const newIndex = items.findIndex(item => item.id === overId);
        
        if (oldIndex === -1 || newIndex === -1) return items;
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, [categories]);

  const handleAddCard = useCallback((content: string) => {
    const newItem: CardItem = {
      id: `item-${Date.now()}`,
      content,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  }, []);

  const handleAddCategory = useCallback((name: string) => {
    const newCategory: CategoryType = {
      id: `category-${Date.now()}`,
      name,
      items: [],
    };
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  }, []);

  const handleDeleteCategory = useCallback((categoryId: string) => {
    setCategories(prevCategories => {
      const categoryToDelete = prevCategories.find(cat => cat.id === categoryId);
      if (!categoryToDelete) return prevCategories;

      // Move all items from the deleted category back to the items list
      setItems(prevItems => [...prevItems, ...categoryToDelete.items]);

      // Remove the category
      return prevCategories.filter(cat => cat.id !== categoryId);
    });
  }, []);

  const handleDeleteItem = useCallback((itemId: string) => {
    // Try to remove from items list
    setItems(prevItems => {
      const exists = prevItems.some(item => item.id === itemId);
      if (exists) {
        return prevItems.filter(item => item.id !== itemId);
      }
      return prevItems;
    });

    // Try to remove from categories
    setCategories(prevCategories => 
      prevCategories.map(category => ({
        ...category,
        items: category.items.filter(item => item.id !== itemId)
      }))
    );
  }, []);

  return {
    items,
    setItems,
    categories,
    setCategories,
    activeId,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleAddCard,
    handleAddCategory,
    handleDeleteCategory,
    handleDeleteItem,
  };
};
