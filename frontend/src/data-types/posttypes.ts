export interface LostFoundPost {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  isLost: boolean;
}

export interface BorrowPost {
  id: number;
  title: string;
  description: string;
  category: string;
}

export interface SecondHandPost {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: string;
}
