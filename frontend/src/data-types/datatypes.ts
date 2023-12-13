export interface User {
  _id?: string;
  createdAt?: Date;
  username: string;
  bilkentId: string;
  image: string;
  email: string;
  password: string;
}

export interface UserProfile {
  _id?: string;
  userID: string;
  username: string;
  email: string;
  image: string;
  description: string;
  reputation: number;
  ownedPosts: [string];
  savedPosts: [string];
  createdAt?: Date;
}

export interface ForumEntry {
  _id: string;
  content: string;
  poster: string;
  createdAt: string;
  voteScore: number;
}

export interface FilterProps {
  type: string;
  passFilters: (params: FilterParams) => void;
}

export interface FilterParams {
  categories: string[];
  prices: {
    min: number | undefined;
    max: number | undefined;
  };
  dates: {
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
  status: string;
  desiredCourse: string;
  offeredCourse: string;
  desiredSection: number | undefined;
  offeredSection: number | undefined;
}

export interface CreatePostProps {
  onClose: () => void;
}

export interface CreatePostButtonProps {
  type: string;
}
