import React, { useEffect, useState } from 'react';
import autosize from 'autosize';
import { RiImageAddFill } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import { Modal } from '../../../../components';
import { IMG } from '../../../../images';
import styled from './ModalCreatePost.module.scss';
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

  const onImageChange = async (event) => {
    console.log(event.target.files);
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

  return (
    <Modal style={style} className={`${styled['modal-create-post']} ${className}`}>
      <div className={styled.header}>Tạo bài viết</div>
      <div className={styled.content}>
        <div className={styled.input__container}>
          <div className={styled.user__img}>
            <img src="https://st.quantrimang.com/photos/image/2021/05/21/AVT-Doi-Anime-12.jpg" alt="" />
          </div>
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
              <span>Thêm ảnh</span>
            </div>
          </div>
        )}
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
              setHaveChooseEmotion(true);
            }}
          >
            <IMG.Emotion style={{ fill: '#f5c33b' }} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreatePost;
