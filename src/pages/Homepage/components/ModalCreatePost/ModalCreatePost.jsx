import React, { useEffect, useMemo, useState } from 'react';
import autosize from 'autosize';
import { RiImageAddFill } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import { Modal, UserImg } from '../../../../components';
import { IMG } from '../../../../images';
import styled from './ModalCreatePost.module.scss';
import { Emotion } from '..';
import { useSelector, useDispatch } from 'react-redux';
import {
  addPostImg,
  changePostText,
  clearPostEmotion,
  createPost,
  editPost,
  postsSelector,
  removePostImg,
} from '../../../../features/postsSlice';
import { v4 as uuidv4 } from 'uuid';
import { toggleHaveChooseEmotion, toggleHaveChoosePhoto, uiSelector } from '../../../../features/uiSlice';
import { authSelector } from '../../../../features/authSlice';
const ModalCreatePost = ({ className = '', style, type, postId, onCloseModal }) => {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { user } = useSelector(authSelector);
  const ui = useSelector(uiSelector);
  const posts = useSelector(postsSelector);
  const dispatch = useDispatch();

  const allowBtn = useMemo(
    () =>
      posts.dataPosts.postText.trim().length === 0 && posts.dataPosts.image.length === 0 && posts.dataPosts.emotion === null,
    [posts.dataPosts.postText, posts.dataPosts.image, posts.dataPosts.emotion],
  );

  const onImageChange = async (e) => {
    const { files } = e.target;
    const url = URL.createObjectURL(files[0]);
    dispatch(
      addPostImg({
        id: uuidv4(),
        url,
        file: files[0],
      }),
    );
  };

  const removeImgHandler = (id) => () => {
    console.log('click');
    dispatch(removePostImg(id));
  };

  const postTextChangeHandler = (e) => {
    dispatch(changePostText(e.target.value));
  };

  useEffect(() => {
    if (allowBtn) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [allowBtn]);

  const editPostHandler = () => {
    dispatch(
      editPost({
        description: posts.dataPosts.postText,
        image: posts.dataPosts.image,
        emoji: posts.dataPosts.emotion?.id,
        postId,
        callback: () => {
          onCloseModal();
        },
      }),
    );
  };

  const createPostHandler = async () => {
    if (allowBtn) {
      setDisabledBtn(true);
      return;
    }
    setDisabledBtn(false);

    dispatch(
      createPost({
        description: posts.dataPosts.postText,
        image: posts.dataPosts.image,
        emoji: posts.dataPosts.emotion?.id,
        callback: () => {
          onCloseModal();
        },
      }),
    );
  };

  useEffect(() => {
    autosize(document.querySelector('textarea'));
  }, []);

  const closeEmotionHandler = () => {
    dispatch(toggleHaveChooseEmotion());
    dispatch(clearPostEmotion());
  };

  return (
    <Modal style={style} className={`${styled['modal-create-post']} ${className}`}>
      <div className={styled.header}>
        <span>Tạo bài viết</span>
        <div className={styled.close} onClick={onCloseModal}>
          <IoClose />
        </div>
      </div>
      <div className={styled.content}>
        <div className={styled.content__header}>
          <UserImg userImg={user?.profilePicture} />
          <div className={styled.info}>
            <span>{user?.username}</span>
            {posts.dataPosts.emotion && (
              <span>
                đang cảm thấy {posts.dataPosts.emotion?.name} <img src={posts.dataPosts.emotion?.icon} alt="" />{' '}
              </span>
            )}
          </div>
        </div>
        <div className={styled.input__container}>
          <textarea
            name="postValue"
            className={styled.input__post}
            onChange={postTextChangeHandler}
            placeholder={`${user?.username} ơi, bạn đang nghĩ gì thế?`}
            value={posts.dataPosts.postText}
          ></textarea>
        </div>
        {posts.dataPosts.image.length !== 0 && (
          <div className={styled.img__list}>
            {posts.dataPosts.image.map((img) => {
              return (
                <div className={styled.img__preview} key={img.id || img}>
                  <img src={img.url || img} alt="" />
                  <div className={styled.close} onClick={removeImgHandler(img.id || img)}>
                    <IoClose />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {ui.createPostModal.haveChoosePhoto && (
          <div className={styled.input__photo}>
            <input type="file" accept="image/*" onChange={onImageChange} />
            <div
              className={styled.close}
              onClick={() => {
                dispatch(toggleHaveChoosePhoto());
              }}
            >
              <IoClose />
            </div>
            <div className={styled.input__dummy}>
              <RiImageAddFill />
              <span>Thêm ảnh hoặc kéo và thả</span>
            </div>
          </div>
        )}

        {ui.createPostModal.haveChooseEmotion && <Emotion onClose={closeEmotionHandler} />}
      </div>
      <div className={styled.bottom}>
        <p className={styled.text}>Thêm vào bài viết</p>
        <div className={styled.actions}>
          <div
            className={styled.add__photo}
            onClick={() => {
              dispatch(toggleHaveChoosePhoto());
            }}
          >
            <IMG.AddPhoto style={{ fill: '#00a400' }} />
          </div>
          <div className={styled.add__emotion} onClick={closeEmotionHandler}>
            <IMG.Emotion style={{ fill: '#f5c33b' }} />
          </div>
          <button
            onClick={type === 'post' ? createPostHandler : editPostHandler}
            disabled={disabledBtn || posts.dataPosts?.loading}
          >
            {posts.dataPosts.loading ? 'Loading...' : type === 'post' ? 'post' : 'edit'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(ModalCreatePost);
