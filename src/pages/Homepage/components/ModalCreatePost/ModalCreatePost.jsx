import React, { useEffect, useState } from 'react';
import autosize from 'autosize';
import { RiImageAddFill } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import { Modal } from '../../../../components';
import { IMG } from '../../../../images';
import styled from './ModalCreatePost.module.scss';
import { Emotion } from '..';
const ModalCreatePost = ({
  className = '',
  style,
  haveChoosePhoto,
  haveChooseEmotion,
  setHaveChooseEmotion,
  setHaveChoosePhoto,
}) => {
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);
  const [emotion, setEmotion] = useState(null);

  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const postTextChangeHandler = (e) => {
    setPostText(e.target.value);
  };

  useEffect(() => {
    autosize(document.querySelector('textarea'));
  }, []);

  console.log(postText, emotion);

  return (
    <Modal style={style} className={`${styled['modal-create-post']} ${className}`}>
      <div className={styled.header}>Tạo bài viết</div>
      <div className={styled.content}>
        <div className={styled.content__header}>
          <div className={styled.user__img}>
            <img src="https://st.quantrimang.com/photos/image/2021/05/21/AVT-Doi-Anime-12.jpg" alt="" />
          </div>
          <div className={styled.info}>
            <span>Hoang Huy</span>
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
            placeholder="Huy ơi, bạn đang nghĩ gì thế?"
          ></textarea>
        </div>
        <div className={styled.img__list}>
          <div className={styled.img__group}>{/* <img src={photo} alt="" /> */}</div>
        </div>
        {haveChoosePhoto && !image && (
          <div className={styled.input__photo}>
            <input type="file" accept="image/*" onChange={onImageChange} />
            <div
              className={styled.close}
              onClick={() => {
                setHaveChoosePhoto(false);
                setImage(null);
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
        {image && (
          <div className={styled.img__preview}>
            <img src={image} alt="" />
            <div
              className={styled.close}
              onClick={() => {
                setImage(null);
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
          <button>Post</button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreatePost;
