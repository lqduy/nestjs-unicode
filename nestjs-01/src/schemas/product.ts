import { Category } from 'src/constants/enum';

export type Product = {
  id: number;
  name: string;
  price: number;
  description?: string;
  category: Category;
  tags?: string[];
};
