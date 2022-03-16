import { Stack } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { useFormik } from 'formik';
import { IMG } from 'images';
import { ButtonSaveChange, FormWrap, Illustration, Title } from 'pages/SettingAccount/Styles';
import React, { useEffect, useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import * as Yup from 'yup';
import InputField from '../Input/InputField';
import { Message } from './Styles';

const SettingSecurity = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [messageChangePassword, setMessageChangePassword] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    onSubmit: async (values, actions) => {
      try {
        setLoading(true);
        const { data } = await isekaiApi.changePassword(values.oldPassword, values.newPassword);
        setMessageChangePassword(data.message);
        setIsSuccess(true);
        setLoading(false);
      } catch (error: any) {
        setMessageChangePassword(error.response.data.message);
        setIsSuccess(false);
        setLoading(false);
      }

      actions.resetForm();
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Bạn không được để trống thông tin này.'),
      newPassword: Yup.string().required('Bạn không được để trống thông tin này.').min(6, 'Mật khẩu phải ít nhất 6 kí tự'),
      repeatNewPassword: Yup.string()
        .required('Bạn không được để trống thông tin này.')
        .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp.'),
    }),
  });

  useEffect(() => {
    let time: any = null;
    if (messageChangePassword.length > 0) {
      time = setTimeout(() => {
        setMessageChangePassword('');
      }, 5000);
    }
    return () => {
      if (time) {
        clearTimeout(time);
      }
    };
  }, [messageChangePassword]);

  return (
    <>
      <Title>Bảo mật</Title>
      <FormWrap>
        <form onSubmit={formik.handleSubmit}>
          {messageChangePassword.length !== 0 &&
            (isSuccess ? (
              <Message isSuccess={true}>{messageChangePassword}</Message>
            ) : (
              <Message isSuccess={false}>{messageChangePassword}</Message>
            ))}
          <InputField
            label="Mật khẩu hiện tại"
            id="oldPassword"
            name="oldPassword"
            icon={<RiLockPasswordLine />}
            onChange={formik.handleChange}
            value={formik.values.oldPassword}
            error={formik.errors.oldPassword && formik.touched.oldPassword}
            errorText={formik.errors.oldPassword}
            onBlur={formik.handleBlur}
            type="password"
          />
          <Stack sx={{ flexDirection: 'row', gap: '2.4rem' }}>
            <InputField
              label="Mật khẩu mới"
              id="newPassword"
              name="newPassword"
              icon={<RiLockPasswordLine />}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              error={formik.errors.newPassword && formik.touched.newPassword}
              errorText={formik.errors.newPassword}
              type="password"
            />
            <InputField
              label="Nhập lại mật khẩu mới"
              id="repeatNewPassword"
              name="repeatNewPassword"
              icon={<RiLockPasswordLine />}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.repeatNewPassword}
              error={formik.errors.repeatNewPassword && formik.touched.repeatNewPassword}
              errorText={formik.errors.repeatNewPassword}
              type="password"
            />
          </Stack>
          <ButtonSaveChange type="submit" disabled={!(formik.isValid && formik.dirty)}>
            {loading ? 'Loading...' : 'Lưu thay đổi'}
          </ButtonSaveChange>
        </form>
        <Illustration>
          <IMG.SettingSecurity />
          <p>
            Nếu bạn muốn tìm hiểu thêm về cài đặt bảo mật, bạn có thể đọc về cài đặt này trong <span>hướng dẫn sử dụng</span>
            .
          </p>
        </Illustration>
      </FormWrap>
    </>
  );
};

export default SettingSecurity;
