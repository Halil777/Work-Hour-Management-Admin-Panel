export interface User {
  id: number;
  telegramId: string | null;
  name: string;
  position: string;
  isLinked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
