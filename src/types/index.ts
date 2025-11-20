export interface CardItem {
  id: string;
  content: string;
}

export interface CategoryType {
  id: string;
  name: string;
  items: CardItem[];
}

export interface Category {
  id: string;
  name: string;
  items: CardItem[];
}

export interface CardSortConfig {
  id: string;
  title: string;
  description: string;
  items: CardItem[];
  categories: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface CardSortResult {
  categories: Category[];
  timestamp: string;
  participantId?: string;
}

export interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  shareableLink: string;
  onSendEmail: (email: string) => void;
}

// Tree Test Types
export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

export interface TreeTask {
  id: string;
  question: string;
  correctNodeId: string;
}

export interface TreeTestConfig {
  id: string;
  title: string;
  tree: TreeNode[];
  tasks: TreeTask[];
}
