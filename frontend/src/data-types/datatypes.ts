export interface User {
  name: string;
  bilkentId: string;
  photo: string;
  email: string;
  password: string;
}

export interface UserProfile {
  _id?: string;
  userID: string;
  username: string;
  email: string;
  name: string;
  image: string;
  bio: string;
  reputation: number;
  JoinedAt: Date;
  ownPosts: [string];
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
