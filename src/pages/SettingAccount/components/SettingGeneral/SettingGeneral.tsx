import { Stack } from '@mui/material';
import { authSelector } from 'features/authSlice';
import { editUserInfo } from 'features/userSlice';
import { useFormik } from 'formik';
import { IMG } from 'images';
import { ButtonSaveChange, FormWrap, Illustration, Title } from 'pages/SettingAccount/Styles';
import React from 'react';
import { BiUser } from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';
import { MdOutlineLocationOn } from 'react-icons/md';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import InputField from '../Input/InputField';

const SettingGeneral = () => {
  const { user } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      username: user?.username,
      email: user?.email,
      address: '',
    },
    onSubmit: (values) => {
      dispatch(
        editUserInfo({
          username: values.username,
          email: values.email,
        }),
      );
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Bạn không được để trống thông tin này.'),
      email: Yup.string().email('Email không hợp lệ').required('Bạn không được để trống thông tin này.'),
    }),
  });

  return (
    <>
      <Title>Cài đặt chung</Title>
      <FormWrap>
        <form onSubmit={formik.handleSubmit}>
          <Stack sx={{ flexDirection: 'row', gap: '2.4rem' }}>
            <InputField
              label="Tên"
              id="username"
              name="username"
              icon={<BiUser />}
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}
              error={formik.touched.username && formik.errors.username}
              errorText={formik.errors.username}
            />
            <InputField
              label="Email"
              id="email"
              name="email"
              icon={<HiOutlineMail />}
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
              errorText={formik.errors.email}
              type="email"
            />
          </Stack>
          <InputField
            label="Địa chỉ"
            id="address"
            name="address"
            icon={<MdOutlineLocationOn />}
            onChange={formik.handleChange}
            value={formik.values.address}
            placeholder="Điền địa chỉ của bạn"
            onBlur={formik.handleBlur}
          />
          <p className="form-text">
            Đảm bảo điền vào cài đặt vị trí của bạn. Điều này sẽ giúp chúng tôi gợi ý cho bạn những người bạn có liên quan và
            những địa điểm bạn có thể thích.
          </p>
          <ButtonSaveChange type="submit" disabled={!(formik.isValid && formik.dirty)}>
            Lưu thay đổi
          </ButtonSaveChange>
        </form>
        <Illustration>
          <IMG.SettingGeneral />
          <p>
            Nếu bạn muốn tìm hiểu thêm về cài đặt chung, bạn có thể đọc về cài đặt này trong <span>hướng dẫn sử dụng</span>.
          </p>
        </Illustration>
      </FormWrap>
    </>
  );
};

export default SettingGeneral;
