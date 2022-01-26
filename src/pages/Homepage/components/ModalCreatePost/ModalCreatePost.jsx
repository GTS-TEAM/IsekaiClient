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
import { useOverFlowHidden } from '../../../../hooks/useOverFlowHidden';
import { v4 as uuidv4 } from 'uuid';
import { isekaiApi } from '../../../../api/isekaiApi';
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
  const [previewImg, setPreviewImg] = useState([]);
  const [emotion, setEmotion] = useState(null);
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();

  const onImageChange = async (e) => {
    const { files } = e.target;
    for (const file of files) {
      const url = URL.createObjectURL(file);
      setPreviewImg((prev) => {
        const temp = [...prev];
        temp.push({
          id: uuidv4(),
          url,
          file: files[0],
        });
        return temp;
      });
    }
  };

  const removeImgHandler = (id) => {
    setPreviewImg((prev) => {
      const temp = [...prev];
      return temp.filter((item) => {
        return item.id !== id;
      });
    });
  };

  const postTextChangeHandler = (e) => {
    setPostText(e.target.value);
  };

  const createPostHandler = async () => {
    debugger;
    if (postText.trim().length === 0) {
      setDisabledBtn(true);
      return;
    }
    setDisabledBtn(false);

    const formData = new FormData();

    previewImg.forEach((item) => {
      formData.append('file', item.file);
    });

    const { urls } = await isekaiApi.uploadImg(formData);

    dispatch(
      createPost({
        description: postText,
        image: urls,
        callback: () => {
          setPostText('');
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
            value={postText}
          ></textarea>
        </div>
        {previewImg.length !== 0 && (
          <div className={styled.img__list}>
            {previewImg.map((img) => {
              return (
                <div className={styled.img__preview} key={img.id}>
                  <img src={img.url} alt="" />
                  <div
                    className={styled.close}
                    onClick={() => {
                      removeImgHandler(img.id);
                    }}
                  >
                    <IoClose />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {haveChoosePhoto && (
          <div className={styled.input__photo}>
            <input type="file" accept="image/*" onChange={onImageChange} />
            <div
              className={styled.close}
              onClick={() => {
                setHaveChoosePhoto(false);
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

        {haveChooseEmotion && <Emotion emotion={emotion} setEmotion={setEmotion} />}
      </div>
      <div className={styled.bottom}>
        <p className={styled.text}>Thêm vào bài viết</p>
        <div className={styled.actions}>
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
