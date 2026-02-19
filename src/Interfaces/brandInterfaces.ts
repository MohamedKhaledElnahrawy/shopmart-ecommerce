

export interface BrandResponse {
  metadata: Meta;
  results: number;
  data: BrandItem[];
}
export interface BrandDetailsResponse {
  metadata: Meta;
  results: number;
  data: BrandItem;
}

export interface Meta {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number; 
}

export interface BrandItem {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
