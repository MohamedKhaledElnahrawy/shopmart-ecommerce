

export interface CategoryResponse {
  metadata: Meta;
  results: number;
  data: CategoryItem[];
}
export interface CategoryDetailsResponse {
  metadata: Meta;
  results: number;
  data: CategoryItem;
}

export interface Meta {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number; 
}

export interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
