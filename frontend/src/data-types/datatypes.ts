export interface User {
  _id?: string;
  createdAt?: Date;
  username: string;
  bilkentId: string;
  image: string;
  email: string;
  password: string;
}
export interface OwnPost {
  id: string;
  typename: string;
  title: string;
  offeredCourse: string;
  offeredSection: string;
  desiredCourse: string;
  desiredSection: string;
}

export interface UserProfile {
  _id?: string;
  userID: string;
  username: string;
  email: string;
  image: string;
  description: string;
  reputation: number;
  ownPosts: OwnPost[]; // Array of objects matching OwnPost schema
  savedPosts: string[];
  createdAt?: Date;
}
/*
export interface UserProfile {
  _id?: string;
  userID: string;
  username: string;
  email: string;
  image: string;
  description: string;
  reputation: number;
  ownPosts: [[string]];
  savedPosts: [string];
  createdAt?: Date;
}
*/

export interface Conversation {
  _id?: string;
  userIDs: string[];
  messages: Message[];
  createdAt?: Date;
  updatedAt?: Date;
  username: string; // username of the other user
}

export interface Message {
  _id?: string;
  userID: string;
  message: string;
  createdAt?: Date;
}

export interface ForumEntry {
  [x: string]: any;
  _id: string;
  content: string;
  poster: string;
  createdAt: string;
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
  page: number;
  limit: number;
}

export interface CreatePostButtonProps {
  type: string;
}

export interface CreatePostProps {
  onClose: () => void;
}

export interface DeletePostButtonProps {
  postId: string;
  profileId: string;
  type: string;
}

export interface DeletePostProps {
  onClose: () => void;
  postId: string;
  profileId: string;
  type: string;
}

export interface ReportPostButtonProps {
  postId: string;
  profileId: string;
  type: string;
}

export interface ReportPostProps extends ReportPostButtonProps {
  onClose: () => void;
}


export interface EditPostButtonProps {
  type: string;
  postId: string;
}

export interface EditPostProps {
  onClose: () => void;
  postId: string;
}



export interface CreateEntryButtonProps {
  postId: string;
}

export interface CreateEntryProps {
  onClose: () => void;
  postId: string;
}

export interface DeleteEntryButtonProps {
  postId: string;
  entryId: string;
}

export interface DeleteEntryProps {
  onClose: () => void;
  postId: string;
  entryId: string;
}

export interface EditEntryButtonProps {
  postId: string;
  entryId: string;
  entryContent: string;
}

export interface EditEntryProps {
  onClose: () => void;
  postId: string;
  entryId: string;
  entryContent: string;
}
