import { Alert, ClickAwayListener, Snackbar, Stack } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { useFormik } from 'formik';
import { IMG } from 'images';
import { ButtonSaveChange, FormWrap, Illustration, SettingAccountContainer, Title } from 'pages/SettingAccount/Styles';
import React, { useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import * as Yup from 'yup';
import InputField from '../Input/InputField';

const SettingSecurity = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [messageChangePassword, setMessageChangePassword] = useState<string>('');
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
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
        setOpen(true);
      } catch (error: any) {
        setMessageChangePassword(error.response.data.message);
        setIsSuccess(false);
        setLoading(false);
        setOpen(true);
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

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          formik.setErrors({
            oldPassword: undefined,
            newPassword: undefined,
            repeatNewPassword: undefined,
          });
        }}
      >
        <SettingAccountContainer>
          <Title>Bảo mật</Title>
          <FormWrap>
            <form onSubmit={formik.handleSubmit}>
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
                Nếu bạn muốn tìm hiểu thêm về cài đặt bảo mật, bạn có thể đọc về cài đặt này trong{' '}
                <span>hướng dẫn sử dụng</span>.
              </p>
            </Illustration>
          </FormWrap>
        </SettingAccountContainer>
      </ClickAwayListener>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Alert
          onClose={handleClose}
          severity={isSuccess ? 'success' : 'error'}
          sx={{ width: '100%', fontSize: '1.4rem', fontWeight: '500' }}
        >
          {messageChangePassword}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SettingSecurity;
