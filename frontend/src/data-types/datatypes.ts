export interface User {
  name: string;
  bilkentId: string;
  photo: string;
  email: string;
  password: string;
}

export interface UserProfile {
  username: string;
  name: string;
  email: string;
  photo: string;
  reputation: number;
  bio: string;
  registerDate: string;
}

export interface Category {
  name: string;
  subcategories: Subcategory[];
}

export interface CategoryProps {
  type: string;
  passCategories: (categories: string[]) => void;
}
