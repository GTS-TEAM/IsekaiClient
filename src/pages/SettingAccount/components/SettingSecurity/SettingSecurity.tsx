import { Stack } from '@mui/material';
import { useFormik } from 'formik';
import { IMG } from 'images';
import { ButtonSaveChange, FormWrap, Illustration, Title } from 'pages/SettingAccount/Styles';
import React from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import InputField from '../Input/InputField';

const SettingSecurity = () => {
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
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
          />
          <Stack sx={{ flexDirection: 'row', gap: '2.4rem' }}>
            <InputField
              label="Mật khẩu mới"
              id="newPassword"
              name="newPassword"
              icon={<RiLockPasswordLine />}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
            />
            <InputField
              label="Nhập lại mật khẩu mới"
              id="repeatNewPassword"
              name="repeatNewPassword"
              icon={<RiLockPasswordLine />}
              onChange={formik.handleChange}
              value={formik.values.repeatNewPassword}
            />
          </Stack>
          <ButtonSaveChange>Lưu thay đổi</ButtonSaveChange>
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
