import { FilterParams } from "./datatypes";

export interface FilterProps {
  type: string;
  passFilters: (params: FilterParams) => void;
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

export interface MessengerProps {
  onMessageLinkClick?: () => void;
}

export interface ChatMessageProps {
  chatTitle: string;
  onSelectChat: (chatTitle: string) => void;
  isActive: boolean;
}
