import { Conversation, FilterParams } from "./datatypes";

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
  title: string;
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
  onClick?: () => void;
  selectedConversation?: Conversation;
}

export interface HeaderProps {
  onMessengerClick?: () => void;
}

export interface ErrorModalProps {
  message: string;
  onClose?: () => void;
  autoCloseDelay?: number;
}

export default interface BaseModalProps {
  title?: string;
  message?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCloseButton?: boolean;
  customClass?: string;
  disableOverlayClick?: boolean;
  modalWidth?: string;
  modalHeight?: string;
  draggable?: boolean;
}

export interface SuccessModalProps extends BaseModalProps {
  width?: string;
  height?: string;
}

export interface SuccessModalProps extends BaseModalProps {
  email?: string;
  width?: string;
  height?: string;
  prompt?: string;
}
