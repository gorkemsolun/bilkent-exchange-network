export interface Post { // this will be used for retrieving posts in profile and saved-posts
  _id: string;
  title: string;
  createdAt: Date;
  postType: string;
}

export interface LostFoundPost {
  _id: string;
  title: string;
  description: string;
  category: string;
  poster: string;
  createdAt: Date;
  image: string;
  status: string;
}

export interface BorrowPost {
  _id: string;
  title: string;
  description: string;
  category: string;
  poster: string;
  createdAt: Date;
}

export interface SecondhandPost {
  _id: string;
  title: string;
  description: string;
  category: string;
  poster: string;
  createdAt: Date;
  image: string;
  price: string;
}

export interface DonatePost {
  _id: string;
  title: string;
  description: string;
  category: string;
  poster: string;
  createdAt: Date;
  image: string;
}

export interface SectionexchangePost {
  _id: string;
  username: string;
  poster: string;
  createdAt: Date;
  offeredSection: string;
  desiredSection: string;
  offeredCourse: string;
  desiredCourse: string;
}

export interface ForumPost {
  id: string;
  title: string;
  description: string;
  poster: string;
  date: string;
}
