import { Avatar, AvatarGroup, Badge, Button, IconButton, List, Modal, Stack } from '@mui/material';
import { authSelector } from 'features/authSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useState } from 'react';
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { ConversationItem, ConversationType, User } from 'share/types';
import { LikerGroup, LikerText, StyledLiveStats, StyleMdLiked } from './Styles';
import UserLiked from './UserLiked';
import { Close, Favorite, MessageSharp } from '@mui/icons-material';
import { selectPopupChat } from 'features/chatSlice';
import { isekaiApi } from 'api/isekaiApi';
import { v4 } from 'uuid';

interface Props {
  totalLike: number;
  totalComment: number;
  userLiked?: User[];
  className?: string;
  haveUserLiked: boolean;
}

const LiveStats: React.FC<Props> = ({ totalLike, totalComment, userLiked, className, haveUserLiked }) => {
  const { user: currentUser } = useAppSelector(authSelector);
  const { user } = useAppSelector(authSelector);
  const [openLiked, setOpenLiked] = useState(false);
  const dispatch = useAppDispatch();
  const chooseConversation = async (friend: User) => {
    try {
      const { data } = await isekaiApi.getConversationByReceiverId(friend.id);
      dispatch(
        selectPopupChat({
          receiverId: friend.id,
          currentConversation: data,
        }),
      );
    } catch (error) {
      const newConversation: ConversationItem = {
        id: `${user?.id}-${friend.id}`,
        members: [
          {
            id: v4(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_conversation_at: null,
            nickname: null,
            role: 'member',
            //@ts-ignore
            user: {
              ...friend,
              last_activity: null,
            },
          },
          {
            id: v4(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_conversation_at: null,
            nickname: null,
            role: 'member',
            //@ts-ignore
            user: {
              ...user,
              last_activity: null,
            },
          },
        ],
        type: ConversationType.PRIVATE,
        last_message: null,
        avatar: null,
        name: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        theme: '#a56ffd',
      };
      dispatch(
        selectPopupChat({
          receiverId: friend.id,
          currentConversation: newConversation,
        }),
      );
    }
  };

  return totalComment !== 0 || totalLike !== 0 ? (
    <StyledLiveStats className={className}>
      {haveUserLiked && userLiked ? (
        <LikerGroup>
          <AvatarGroup max={3} sx={{ marginLeft: '0.8rem' }}>
            {userLiked.map((user) => (
              <UserLiked user={user} key={user.id} />
            ))}
          </AvatarGroup>
          <LikerText userLiked={userLiked}>
            <Stack direction="row">
              {userLiked.slice(0, 2).map((user) => (
                <Link to={`/profile/${user.id}`} key={user.id}>
                  {user.id === currentUser?.id ? 'Bạn' : user.username}
                </Link>
              ))}
            </Stack>
            <div className="showUserLiked">
              {userLiked.length - 2 > 0 && (
                <span onClick={() => setOpenLiked(true)}> Và {userLiked.length - 2} người khác</span>
              )}
              <div className="hoverShowUserLike">
                {userLiked.slice(0, 4).map((user) => (
                  <span>{user.id === currentUser?.id ? 'Bạn' : user.username}</span>
                ))}
                {userLiked.length - 4 > 0 && <span> Và {userLiked.length - 4} người khác</span>}
                <Modal
                  open={openLiked}
                  onClose={() => setOpenLiked(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <StyleMdLiked>
                    <div className="topMdLiked">
                      <h3>Tất cả</h3>
                      <IconButton
                        sx={{
                          mb: 2,
                        }}
                        onClick={() => setOpenLiked(false)}
                      >
                        <Close />
                      </IconButton>
                    </div>
                    <List>
                      {userLiked.map((user) => (
                        <div className="PoShowLiked">
                          <div className="showLiLiked">
                            <Badge
                              overlap="circular"
                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                              badgeContent={
                                <Favorite
                                  sx={{
                                    color: 'white',
                                    position: 'absolute',
                                    top: '-0.5rem',
                                    left: '-0.5rem',
                                    background: 'red',
                                    borderRadius: '50%',
                                  }}
                                />
                              }
                            >
                              <Avatar src={user.avatar} />
                            </Badge>
                            <Link to={`/profile/${user.id}`} style={{ color: 'black' }}>
                              <h2>{user.username}</h2>
                            </Link>
                          </div>
                          <div className="messager">
                            <Button
                              startIcon={<MessageSharp />}
                              sx={{ background: '#EDE4E3', padding: '1rem' }}
                              onClick={() => {
                                setOpenLiked(false);
                                chooseConversation(user);
                              }}
                            >
                              <h2>Nhắn tin</h2>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </List>
                  </StyleMdLiked>
                </Modal>
              </div>
            </div>
          </LikerText>
        </LikerGroup>
      ) : (
        <Stack direction="row" columnGap="1rem" alignItems="center">
          {totalLike !== 0 && (
            <Stack direction="row" alignItems="center" columnGap="0.5rem">
              <AiOutlineHeart />
              <span>{totalLike}</span>
            </Stack>
          )}
          {totalComment !== 0 && (
            <Stack direction="row" alignItems="center" columnGap="0.5rem">
              <AiOutlineMessage />
              <span>{totalComment}</span>
            </Stack>
          )}
        </Stack>
      )}
      <span>{totalComment} bình luận</span>
    </StyledLiveStats>
  ) : null;
};

export default LiveStats;
