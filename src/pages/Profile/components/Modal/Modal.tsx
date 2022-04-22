import LoadingButton from '@mui/lab/LoadingButton';
import { Slider, Stack } from '@mui/material';
import { ModalWrapper } from 'components/Modal';
import { editUserInfo, userSelector } from 'features/userSlice';
import { useAppSelector } from 'hooks/hooks';
import { IMG } from 'images';
import React, { FormEvent, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useDispatch } from 'react-redux';
import { convertResPhotos } from 'utils/convertResPhotos';
import { isekaiApi } from '../../../../api/isekaiApi';
import { Body, ListPhotos, Photo, SelectionBox, UploadBox } from './Styles';

interface Props {
  onClose: () => any;
  field: string;
}

const Modal: React.FC<Props> = ({ onClose, field = 'avatar' }) => {
  const { user } = useAppSelector(userSelector);
  const [step, setStep] = useState<number>(1);
  const [type, setType] = useState<string | null>(null);
  const [img, setImg] = useState<string | null | File>(null);
  const [valueZoom, setValueZoom] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [photos, setPhotos] = useState<any[]>([]);
  const [photoChoose, setPhotoPhotoChoose] = useState<any>({});
  const [avatarRef, setAvatarRef] = useState<any | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const chooseOptionHandler = (type: string) => async () => {
    setType(type);
    setStep(step + 1);
    if (type === 'choose') {
      const { data } = await isekaiApi.getPostPhoto(user?.id || '', 'photo');
      const newData = convertResPhotos(data);
      setPhotos(newData);
    }
  };

  const clickToOpenFileHandler = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const imgFileChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      setImg(e.currentTarget.files[0]);
    }
  };

  const valueZoomChangeHandler = (event: Event, newValue: number | number[]) => {
    setValueZoom(newValue as number);
  };

  const clickSaveImg = async () => {
    if (avatarRef) {
      setLoading(true);
      const canvasScaled = avatarRef.getImageScaledToCanvas().toDataURL();
      const blob = await fetch(canvasScaled).then((res) => res.blob());
      const formData = new FormData();
      formData.append('files', blob);
      const { data } = await isekaiApi.uploadImg(formData);
      dispatch(
        editUserInfo({
          [field]: data.urls[0],
        }),
      );
      setLoading(false);
      onClose();
    }
  };

  const choosePhotoHandler = (photo: any) => () => {
    setPhotoPhotoChoose(photo);
    setImg(photo.url);
  };

  const setEditorRef = (editor: any) => setAvatarRef(editor);

  return (
    <>
      {step === 1 && (
        <ModalWrapper titleHeader="Cập nhật ảnh đại diện" customFooter={<></>} onClose={onClose}>
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
        </ModalWrapper>
      )}
      {step === 2 && type === 'upload' && (
        <ModalWrapper titleHeader="Tải lên" customFooter={<></>} width="716px" onClose={onClose}>
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
                  <Slider max={2} min={1} value={valueZoom} onChange={valueZoomChangeHandler} step={0.01} />
                  <LoadingButton loading={loading} onClick={clickSaveImg}>
                    Xác nhận
                  </LoadingButton>
                </>
              )}
            </Body>
          </Stack>
        </ModalWrapper>
      )}
      {step === 2 && type === 'choose' && (
        <ModalWrapper onClose={onClose} titleHeader="Danh sách ảnh" customFooter={<></>}>
          <Body>
            {!img ? (
              photos.length === 0 ? (
                <p>Không có ảnh nào.</p>
              ) : (
                <ListPhotos>
                  {photos.map((p) => (
                    <Photo key={p.id} onClick={choosePhotoHandler(p)} active={photoChoose.id === p.id}>
                      <img src={p.url} alt="" />
                    </Photo>
                  ))}
                </ListPhotos>
              )
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
                <Slider max={2} min={1} value={valueZoom} onChange={valueZoomChangeHandler} step={0.01} />
                <LoadingButton loading={loading} onClick={clickSaveImg}>
                  Xác nhận
                </LoadingButton>
              </>
            )}
          </Body>
        </ModalWrapper>
      )}
    </>
  );
};

export default Modal;
