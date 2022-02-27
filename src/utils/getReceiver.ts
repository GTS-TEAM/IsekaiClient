import { ConversationItem, User } from 'share/types';
export const getReceiver = (currentConversation: ConversationItem, currentUser: User) => {
  console.log(currentConversation);
  return currentConversation?.members.find((member) => member.user.id !== currentUser.id)?.user;
};
