import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { Box, Stack } from '@mui/material';
import Actions from 'components/Actions/Actions';
import Comments from 'components/Comments/Comments';
import GridImg from 'components/GridImg/GridImg';
import LiveStats from 'components/LiveStats/LiveStats';
import ModalPost from 'components/ModalPost';
import More from 'components/More/More';
import UserBlockPost from 'components/UserBlockPost/UserBlockPost';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { PostItem } from 'share/types';
import { REGEX_URL } from 'utils/constant';
import { authSelector } from '../../features/authSlice';
import { deletePost, likePost } from '../../features/postsSlice';
import { useOverFlowHidden } from '../../hooks/useOverFlowHidden';
import { Body, Description, Header, StyledPost } from './Styles';
interface Props {
  post: PostItem;
}

const Post: React.FC<Props> = ({ post }) => {
  const [isOpenComment, setIsOpenComment] = useState<boolean>(false);
  const { user: currentUser } = useAppSelector(authSelector);
  const [anchorElPost, setAnchorElPost] = React.useState<null | HTMLElement>(null);
  const [isReadMore, setIsReaMore] = useState<boolean>(false);
  const [haveReadMore, setHaveReadMore] = useState<boolean>(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const [haveChooseImg, setHaveChooseImg] = useState<boolean>(false);
  const [haveChooseEmoji, setHaveChooseEmoji] = useState<boolean>(false);
  const descRef = useRef<HTMLParagraphElement | null>(null);

  const openPost = Boolean(anchorElPost);

  const dispatch = useAppDispatch();

  const url = useMemo(() => post.description.match(REGEX_URL)?.[0], [post]) as string;

  const imgsPost = useMemo(
    () =>
      post.image.map((item) => {
        return {
          url: item,
        };
      }),
    [post],
  );

  const desc = useMemo(() => {
    let text = '';
    post.description.match(REGEX_URL)?.forEach((link) => {
      text = post.description.replace(REGEX_URL, `<a href="${link}" target="_blank" >${link}</a>`);
    });
    return text;
  }, [post]);

  const clickOpenMenuHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElPost(event.currentTarget);
  };
  const clickCloseMenuHandler = () => {
    setAnchorElPost(null);
  };

  const clickEditHandler = () => {
    setIsOpenModalEdit(true);
    clickCloseMenuHandler();
  };

  const clickRemoveHandler = () => {
    clickCloseMenuHandler();
    dispatch(deletePost(post.id));
  };

  const toggleOpenCommentHandler = () => {
    setIsOpenComment(!isOpenComment);
  };

  const likePostHandler = () => {
    dispatch(likePost(post.id));
  };

  useOverFlowHidden(isOpenModalEdit);

  const closeModalHandler = useCallback(() => {
    setIsOpenModalEdit(false);
    setHaveChooseEmoji(false);
    setHaveChooseImg(false);
  }, []);

  useEffect(() => {
    if ((descRef.current?.offsetHeight as number) >= 500) {
      setHaveReadMore(true);
    } else {
      setHaveReadMore(false);
    }
  }, []);

  return (
    <StyledPost>
      <Header>
        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <UserBlockPost
            userImg={post.user.avatar}
            userId={post.user.id}
            userName={post.user.username}
            time={post.created_at}
            emoji={post?.emoji}
          />
          {post.user.id === currentUser?.id && (
            <More
              anchorEl={anchorElPost}
              open={openPost}
              onOpenMenu={clickOpenMenuHandler}
              onCloseMenu={clickCloseMenuHandler}
              onClickOpenEdit={clickEditHandler}
              onClickRemove={clickRemoveHandler}
              height="3.6rem"
              width="3.6rem"
              heightIcon="2.4rem"
              widthIcon="2.4rem"
            />
          )}
        </Stack>
      </Header>
      <Body>
        {post.description.length !== 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '1rem',

              span: {
                fontSize: '1.4rem',
                color: 'var(--mainColor)',
                lineHeight: '1.5',
                fontWeight: '500',
                cursor: 'pointer',

                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            }}
          >
            {post.description.includes('http') ? (
              <>
                <Description ref={descRef} haveReadMore={haveReadMore} isReadMore={isReadMore}>
                  {ReactHtmlParser(desc)}
                </Description>
                <LinkPreview url={url} width="auto" />
              </>
            ) : (
              <Description ref={descRef} haveReadMore={haveReadMore} isReadMore={isReadMore}>
                {post.description}
              </Description>
            )}

            {haveReadMore && !isReadMore && (
              <span
                onClick={() => {
                  setIsReaMore(true);
                }}
              >
                Đọc thêm
              </span>
            )}
          </Box>
        )}
        {post.image.length === 0 ? null : <GridImg post={post} />}
        <LiveStats
          totalLike={post.likeCount}
          totalComment={post.commentCount}
          className="live-stats"
          userLiked={post.likes}
          haveUserLiked={true}
        />
      </Body>
      <Actions post={post} onToggleComment={toggleOpenCommentHandler} className="actions" onLike={likePostHandler} />
      {isOpenComment && <Comments postId={post.id} amountComment={post.commentCount} />}
      {isOpenModalEdit && (
        <ModalPost
          type="edit"
          postId={post.id}
          onCloseModal={closeModalHandler}
          imgsPost={imgsPost}
          contentPost={post.description}
          haveChooseEmoji={haveChooseEmoji}
          haveChooseImg={haveChooseImg}
          setHaveChooseEmoji={setHaveChooseEmoji}
          setHaveChooseImg={setHaveChooseImg}
        />
      )}
    </StyledPost>
  );
};

export default Post;
