export interface Property {
  _id?: string;
  title: string;
  price: number;
  location: string;
  imageUrls: string[];
  description: string;
  isFeatured: boolean;
  isForRent: boolean;
  createdAt: Date;
  roomCount: string;
  tags: string[];
}
