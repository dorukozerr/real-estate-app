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

export type PropertyDialogState =
  | { mode: "create"; open: boolean; property: null }
  | { mode: "edit"; open: boolean; property: Property }
  | { mode: ""; open: boolean; property: null };
