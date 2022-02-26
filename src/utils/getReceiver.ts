import { ConversationItem, User } from 'share/types';
export const getReceiver = (currentConversation: ConversationItem, currentUser: User) => {
  return currentConversation?.members.find((member) => member.id !== currentUser.id);
};
