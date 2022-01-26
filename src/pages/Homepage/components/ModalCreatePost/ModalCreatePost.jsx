import React, { useEffect, useState } from 'react';
import autosize from 'autosize';
import { RiImageAddFill } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import { Modal, UserImg } from '../../../../components';
import { IMG } from '../../../../images';
import styled from './ModalCreatePost.module.scss';
import { Emotion } from '..';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../../features/authSlice';
import { useDispatch } from 'react-redux';
import { createPost } from '../../../../features/postsSlice';
import { requestPublic } from '../../../../api/axoisClient';
import { useOverFlowHidden } from '../../../../hooks/useOverFlowHidden';
const ModalCreatePost = ({
  className = '',
  style,
  haveChoosePhoto,
  haveChooseEmotion,
  setHaveChooseEmotion,
  setHaveChoosePhoto,
  setOpen,
  open,
}) => {
  const [postText, setPostText] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [previewImg, setPreviewImg] = useState(null);
  const [formDataImg, setFormDataImg] = useState([]);
  const [emotion, setEmotion] = useState(null);

  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();

  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setPreviewImg(URL.createObjectURL(event.target.files[0]));
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      setFormDataImg([...formDataImg, formData]);
    }
  };

  const postTextChangeHandler = (e) => {
    setPostText(e.target.value);
  };

  const createPostHandler = async () => {
    let imgUrl = null;

    if (formDataImg.length !== 0) {
      imgUrl = await requestPublic.post('/upload', formDataImg, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }

    if (postText.trim().length === 0) {
      setDisabledBtn(true);
      return;
    }

    setDisabledBtn(false);

    dispatch(
      createPost({
        description: postText,
        image: [imgUrl?.url || ''],
        callback: () => {
          setPostText((prevValue) => (prevValue = ''));
          setPreviewImg(null);
          setHaveChoosePhoto(false);
          setHaveChooseEmotion(false);
          setEmotion(null);
          setOpen(false);
        },
      }),
    );
  };

  useEffect(() => {
    if (postText.trim().length === 0) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [postText]);

  useEffect(() => {
    autosize(document.querySelector('textarea'));
  }, []);

  useOverFlowHidden(open);

  return (
    <Modal style={style} className={`${styled['modal-create-post']} ${className}`}>
      <div className={styled.header}>Tạo bài viết</div>
      <div className={styled.content}>
        <div className={styled.content__header}>
          <UserImg userImg={user?.profilePicture} />
          <div className={styled.info}>
            <span>{user?.username}</span>
            {emotion && (
              <span>
                đang cảm thấy {emotion?.name} <img src={emotion?.icon} alt="" />{' '}
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
          ></textarea>
        </div>
        <div className={styled.img__list}>
          <div className={styled.img__group}>{/* <img src={photo} alt="" /> */}</div>
        </div>
        {haveChoosePhoto && !previewImg && (
          <div className={styled.input__photo}>
            <input type="file" accept="image/*" onChange={onImageChange} />
            <div
              className={styled.close}
              onClick={() => {
                setHaveChoosePhoto(false);
                setPreviewImg(null);
              }}
            >
              <IoClose />
            </div>
            <div className={styled.input__dummy}>
              <RiImageAddFill />
              <span>Thêm ảnh</span>
            </div>
          </div>
        )}
        {previewImg && (
          <div className={styled.img__preview}>
            <img src={previewImg} alt="" />
            <div
              className={styled.close}
              onClick={() => {
                setPreviewImg(null);
                setHaveChoosePhoto(false);
              }}
            >
              <IoClose />
            </div>
          </div>
        )}
        {haveChooseEmotion && <Emotion emotion={emotion} setEmotion={setEmotion} />}
      </div>
      <div className={styled.bottom}>
        <p className={styled.text}>Thêm vào bài viết</p>
        <div className={styled.actions}>
          <div
            className={styled.add__photo}
            onClick={() => {
              setHaveChoosePhoto(true);
            }}
          >
            <IMG.AddPhoto style={{ fill: '#00a400' }} />
          </div>
          <div
            className={styled.add__emotion}
            onClick={() => {
              setHaveChooseEmotion(!haveChooseEmotion);
              setEmotion(null);
            }}
          >
            <IMG.Emotion style={{ fill: '#f5c33b' }} />
          </div>
          <button onClick={createPostHandler} disabled={disabledBtn}>
            Post
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreatePost;
