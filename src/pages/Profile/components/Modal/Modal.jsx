import { Slider, Stack } from '@mui/material';
import { IMG } from 'images';
import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { GrFormClose } from 'react-icons/gr';
import { StyledModal, Header, Title, CloseButton, SelectionBox, Body, UploadBox, ListPhotos, Photo } from './Styles';
import AvatarEditor from 'react-avatar-editor';
import { isekaiApi } from 'api/isekaiApi';
import { useDispatch, useSelector } from 'react-redux';
import { editUserInfo, userSelector } from 'features/userSlice';
import { LoadingButton } from '@mui/lab';
import { updateAvatar, updateProfile } from 'features/authSlice';
import { convertResPhotos } from 'utils/convertResPhotos';

const variants = {
  hidden: { opacity: 0, scale: 0.1, x: '-50%', y: '-50%', left: '50%', top: '50%' },
  visible: { opacity: 1, scale: 1, x: '-50%', y: '-50%', left: '50%', top: '50%' },
};

const modal = document.querySelector('#modal');
const Modal = ({ onClose, field = 'avatar' }) => {
  const { user } = useSelector(userSelector);
  const [step, setStep] = useState(1);
  const [type, setType] = useState(null);
  const [img, setImg] = useState();
  const [valueZoom, setValueZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photoChoose, setPhotoPhotoChoose] = useState({});
  const [avatarRef, setAvatarRef] = useState(null);
  const inputFileRef = useRef(null);
  const dispatch = useDispatch();

  const chooseOptionHandler = (type) => async () => {
    setType(type);
    setStep(step + 1);
    if (type === 'choose') {
      const data = await isekaiApi.getPostPhoto(user?.id, 'photo');
      const newData = convertResPhotos(data);
      setPhotos(newData);
    }
  };

  const clickToOpenFileHandler = () => {
    inputFileRef.current.click();
  };

  const imgFileChangeHandler = (e) => {
    e.preventDefault();
    const img = e.target.files[0];
    setImg(img);
  };

  const valueZoomChangeHandler = (event, newValue) => {
    setValueZoom(newValue);
  };

  const clickSaveImg = async () => {
    setLoading(true);
    const canvasScaled = avatarRef.getImageScaledToCanvas().toDataURL();
    const blob = await fetch(canvasScaled).then((res) => res.blob());
    const formData = new FormData();
    formData.append('files', blob);
    const { urls } = await isekaiApi.uploadImg(formData);
    dispatch(
      editUserInfo({
        [field]: urls[0],
      }),
    );
    setLoading(false);
    onClose();
  };

  const choosePhotoHandler = (photo) => () => {
    setPhotoPhotoChoose(photo);
    setImg(photo.url);
  };

  const setEditorRef = (editor) => setAvatarRef(editor);

  return createPortal(
    <StyledModal initial="hidden" animate="visible" exit="hidden" variants={variants}>
      {step === 1 && (
        <React.Fragment>
          <Header>
            <Title>Cập nhật ảnh đại diện</Title>
            <CloseButton onClick={onClose}>
              <GrFormClose />
            </CloseButton>
          </Header>
          <Body>
            <Stack direction="row" columnGap="2.5rem" width="100%">
              <SelectionBox onClick={chooseOptionHandler('upload')}>
                <img src={IMG.ChangeProfile} alt="" />
                <span>Tải ảnh lên</span>
              </SelectionBox>
              <SelectionBox onClick={chooseOptionHandler('choose')}>
                <img src={IMG.UploadProfile} alt="" />
                <span>Chọn từ ảnh</span>
              </SelectionBox>
            </Stack>
          </Body>
        </React.Fragment>
      )}
      {step === 2 && type === 'upload' && (
        <React.Fragment>
          <Header>
            <Title>Tải ảnh lên</Title>
            <CloseButton onClick={onClose}>
              <GrFormClose />
            </CloseButton>
          </Header>
          <Stack>
            <Body>
              {!img ? (
                <UploadBox onClick={clickToOpenFileHandler}>
                  <img src={IMG.AddProfile} alt="" />
                  <span>Chọn ảnh để tải lên avatar</span>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    ref={inputFileRef}
                    onChange={imgFileChangeHandler}
                  />
                </UploadBox>
              ) : (
                <>
                  <AvatarEditor
                    ref={setEditorRef}
                    className="avatar-editor"
                    image={img}
                    width={field === 'avatar' ? 250 : 600}
                    height={field === 'avatar' ? 250 : 300}
                    border={30}
                    borderRadius={field === 'avatar' ? 9999 : 0}
                    color={[0, 0, 0, 0.6]} // RGBA
                    scale={valueZoom}
                    rotate={0}
                    crossOrigin="anonymous"
                  />
                  <Slider classes="slider" max={2} min={1} value={valueZoom} onChange={valueZoomChangeHandler} step={0.01} />
                  <LoadingButton loading={loading} onClick={clickSaveImg}>
                    Submit
                  </LoadingButton>
                </>
              )}
            </Body>
          </Stack>
        </React.Fragment>
      )}
      {step === 2 && type === 'choose' && (
        <React.Fragment>
          <Header>
            <Title>Danh sách ảnh của bạn</Title>
            <CloseButton onClick={onClose}>
              <GrFormClose />
            </CloseButton>
          </Header>
          <Body>
            {!img ? (
              <ListPhotos>
                {photos.map((p) => (
                  <Photo key={p.id} onClick={choosePhotoHandler(p)} active={photoChoose.id === p.id}>
                    <img src={p.url} alt="" />
                  </Photo>
                ))}
              </ListPhotos>
            ) : (
              <>
                <AvatarEditor
                  ref={setEditorRef}
                  className="avatar-editor"
                  image={img}
                  width={field === 'avatar' ? 250 : 600}
                  height={field === 'avatar' ? 250 : 300}
                  border={30}
                  borderRadius={field === 'avatar' ? 9999 : 0}
                  color={[0, 0, 0, 0.6]} // RGBA
                  scale={valueZoom}
                  rotate={0}
                  crossOrigin="anonymous"
                />
                <Slider classes="slider" max={2} min={1} value={valueZoom} onChange={valueZoomChangeHandler} step={0.01} />
                <LoadingButton loading={loading} onClick={clickSaveImg}>
                  Submit
                </LoadingButton>
              </>
            )}
          </Body>
        </React.Fragment>
      )}
    </StyledModal>,
    modal,
  );
};

export default Modal;
