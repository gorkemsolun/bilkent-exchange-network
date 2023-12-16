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

export interface SavedPost {
  id: string;
  typename: string;
  title: string;
  offeredCourse?: string;
  offeredSection?: string;
  desiredCourse?: string;
  desiredSection?: string;
}

export interface PostReport { // görkem report yapma, js kullanıyor.
  _id?: string;
  postId: string;
  reason: string;
  userId: string;
  type: string;
  title: string;
}

export interface UserProfile {
  _id?: string;
  userID: string;
  username: string;
  email: string;
  image: string;
  description: string;
  reputation: number;
  ownPosts: OwnPost[];
  savedPosts: SavedPost[];
  createdAt?: Date;
}

export interface ProfileContextType {
  profile: UserProfile | null;
  profileDispatch: React.Dispatch<ProfileAction>;
}

export interface ProfileAction {
  type: string;
  payload: UserProfile | null;
}

export interface ProfileState {
  profile: UserProfile | null;
}

export interface UserContextType {
  user: UserContext | null;
  dispatch: React.Dispatch<UserAction>;
}

export interface UserContext {
  email: string;
  token: string;
  _id: string;
}

export interface UserState {
  user: UserContext | null;
}

export interface UserAction {
  type: string;
  payload: UserContext | null;
}

/*
This is the old version of UserProfile. It is not used anymore.
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
  username?: string; // username of the other user
}

export interface Message {
  _id?: string;
  userID: string;
  message: string;
  createdAt?: string; // dont change to Date
}

export interface ForumEntry {
  _id?: string;
  content: string;
  poster: string;
  createdAt?: string;
}

export interface FilterParams {
  categories: string[];
  prices: {
    min: number | undefined;
    max: number | undefined;
  };
  dates: {
    startDate: string;
    endDate: string;
  };
  status: string;
  desiredCourse: string;
  offeredCourse: string;
  desiredSection: number | undefined;
  offeredSection: number | undefined;
  page: number;
  limit: number;
}
