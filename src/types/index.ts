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
