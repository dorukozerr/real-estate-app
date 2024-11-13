export interface Property {
  _id?: string;
  title: string;
  price: number;
  location: string;
  imageUrls: string[];
  description: string;
  isFeatured: boolean;
  isForRent: boolean;
  createdAt: string;
  roomCount: string;
  tags: string[];
}

export interface PaginatedProperties {
  listings: Property[];
  total: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}

export type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};
