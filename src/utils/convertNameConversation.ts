import { ConversationItem, ConversationType, User } from 'share/types';
import { getReceiver } from 'utils/getReceiver';
export const convertNameConversation = (currentConversation: ConversationItem, user: User): string | undefined => {
  return currentConversation?.name
    ? currentConversation.name
    : currentConversation?.type === ConversationType.GROUP
    ? `${currentConversation.members
        .slice(0, 2)
        .map((member: any) => (member.nickname || member.user.id === user.id ? 'Bạn' : member.user.username))
        .join(', ')} ${
        currentConversation.members.length - 2 > 0 ? `và ${currentConversation.members.length - 2} người khác` : ''
      }`
    : getReceiver(currentConversation, user as User)?.username;
};
