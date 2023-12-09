export interface Post { // this will be used for retrieving posts in profile and saved-posts
  id: string;
  title: string;
  date: string;
  postType: string;
}

export interface LostFoundPost {
  id: string;
  title: string;
  description: string;
  category: string;
  poster: string;
  date: string;
  image: string;
  status: string;
}

export interface BorrowPost {
  id: string;
  title: string;
  description: string;
  category: string;
  poster: string;
  date: string;
}

export interface SecondhandPost {
  id: string;
  title: string;
  description: string;
  category: string;
  poster: string;
  date: string;
  image: string;
  price: string;
}

export interface DonatePost {
  id: string;
  title: string;
  description: string;
  category: string;
  poster: string;
  date: string;
  image: string;
}

export interface SectionexchangePost {
  id: string;
  username: string;
  poster: string;
  date: string;
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