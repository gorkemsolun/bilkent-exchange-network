export interface User {
  name: string;
  bilkentId: string;
  photo: string;
  email: string;
  password: string;
}

export interface Category {
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  name: string;
}

export interface CategoryProps {
  type: string;
  passCategories: (categories: string[]) => void;
}
