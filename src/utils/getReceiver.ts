import { ConversationItem, User } from 'share/types';
export const getReceiver = (currentConversation: ConversationItem, currentUser: User) => {
  return currentConversation?.members?.find((member) => member?.user?.id !== currentUser?.id)?.user;
};
