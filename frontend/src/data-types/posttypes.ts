import { ForumEntry } from "./datatypes";

export interface Post {
  _id?: string;
  title: string;
  createdAt?: Date;
  postType: string;
}

export interface LostFoundPost {
  _id?: string;
  title: string;
  description: string;
  category: string;
  poster: string;
  image: string;
  status: string;
  createdAt?: Date;
}

export interface BorrowPost {
  _id?: string;
  title: string;
  description: string;
  category: string;
  poster: string;
  createdAt?: Date;
}

export interface SecondhandPost {
  _id?: string;
  title: string;
  description: string;
  category: string;
  poster: string;
  createdAt?: Date;
  image: string;
  price: number;
}

export interface DonatePost {
  _id?: string;
  title: string;
  description: string;
  category: string;
  poster: string;
  createdAt?: Date;
  image: string;
}

export interface SectionexchangePost {
  _id?: string;
  poster: string;
  createdAt?: Date;
  price: number;
  offeredSection: string;
  desiredSection: string;
  offeredCourse: string;
  desiredCourse: string;
}

export interface ForumPost {
  _id?: string;
  title: string;
  description: string;
  poster: string;
  createdAt?: string;
  entries: ForumEntry[];
}
