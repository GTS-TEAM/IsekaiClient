import { Stack } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { uploadSong } from 'features/musicSlice';
import { addToast } from 'features/toastSlice';
import { useFormik } from 'formik';
import { useAppDispatch } from 'hooks/hooks';
import React, { useRef, useState } from 'react';
import { v4 } from 'uuid';
import * as Yup from 'yup';
import { ButtonUpload, FormUpload, InputField } from './Styles';
const SUPPORTED_FORMATS: string[] = ['audio/ogg', 'audio/mpeg', 'audio/wav', 'video/webm'];

// ((http(s):\/\/))((youtu.be\/))[\S]+ input upload youtube
const UploadMusic = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const inputFileRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      fileSong: null as any,
      urlYoutube: '',
    },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      if (values.fileSong) {
        const formData = new FormData();
        formData.append('file', values.fileSong);
        const { data: dataFileRes } = await isekaiApi.uploadSongFile(formData);
        dispatch(uploadSong(dataFileRes));
      }

      if (values.urlYoutube.trim().length > 0) {
        const { data: dataUrlRes } = await isekaiApi.uploadSongUrl(values.urlYoutube);
        dispatch(uploadSong(dataUrlRes.music));
      }
      setLoading(false);
      dispatch(
        addToast({
          content: 'Tải lên thành công',
          id: v4(),
          type: 'success',
        }),
      );
      resetForm();
    },
    validationSchema: Yup.object({
      fileSong: Yup.mixed()
        .nullable()
        .notRequired()
        .test('FILE_SIZE', 'File phải nhỏ hơn 5mb.', (value) => !value || (value && value.size <= 5 * 1024 * 1024))
        .test('FILE_FORMAT', 'Không hỗ trợ loại tệp này.', (value) => {
          return !value || (value && SUPPORTED_FORMATS.includes(value.type));
        }),
      urlYoutube: Yup.string()
        .notRequired()
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gim,
          'Đường dẫn không hỗ trợ.',
        ),
    }),
  });

  const toggleShowForm = () => {
    setShowForm(!showForm);
    formik.resetForm();
  };

  const openFileTrigger = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const removeFile = () => {
    formik.setFieldValue('fileSong', null);
  };

  return (
    <>
      {!showForm && <ButtonUpload onClick={toggleShowForm}>Tải nhạc lên</ButtonUpload>}
      {showForm && (
        <FormUpload onSubmit={formik.handleSubmit}>
          <InputField>
            <Stack flexDirection="row" columnGap="1.2rem" alignItems="center">
              {formik.values.fileSong ? (
                <ButtonUpload onClick={removeFile}>Xóa file</ButtonUpload>
              ) : (
                <ButtonUpload onClick={openFileTrigger}>Chọn file</ButtonUpload>
              )}
              <div className="input-dummy">
                <p> {formik.values.fileSong ? formik.values.fileSong?.name : 'Không file được chọn'}</p>
              </div>
            </Stack>
            {formik.errors.fileSong && <p className="text-error">{formik.errors.fileSong}</p>}

            <input
              type="file"
              accept="audio/*"
              onChange={(e) => {
                formik.setFieldValue('fileSong', e.target.files?.[0]);
              }}
              style={{ display: 'none' }}
              ref={inputFileRef}
            />
          </InputField>
          <div style={{ textAlign: 'center', fontSize: '1.4rem' }}>Or</div>
          <InputField>
            <input
              type="text"
              onChange={formik.handleChange}
              id="urlYoutube"
              name="urlYoutube"
              value={formik.values.urlYoutube}
              placeholder="Eg: https://youtu.be/Vdm6i1m4tDE"
            />
            {formik.errors.urlYoutube && <p className="text-error">{formik.errors.urlYoutube}</p>}
          </InputField>
          <ButtonUpload
            sx={{
              '&:disabled': {
                color: 'var(--fds-white) !important',
              },
            }}
            type="submit"
            disabled={!(formik.isValid && formik.dirty) || loading}
          >
            {loading ? 'Loading...' : 'Tải lên'}
          </ButtonUpload>
          <ButtonUpload
            sx={{
              backgroundColor: '#bdbdbd !important',
            }}
            onClick={toggleShowForm}
          >
            Hủy
          </ButtonUpload>
        </FormUpload>
      )}
    </>
  );
};

export default React.memo(UploadMusic);
