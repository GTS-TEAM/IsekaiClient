import { DatePicker } from '@mui/lab';
import { Alert, ClickAwayListener, Snackbar, Stack } from '@mui/material';
import { authSelector } from 'features/authSlice';
import { editUserInfo } from 'features/userSlice';
import { useFormik } from 'formik';
import { IMG } from 'images';
import moment from 'moment';
import { ButtonSaveChange, FormWrap, Illustration, SettingAccountContainer, Title } from 'pages/SettingAccount/Styles';
import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { BsPhone } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { MdDateRange, MdOutlineLocationOn } from 'react-icons/md';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import InputField from '../Input/InputField';
import { DatePickerWrap } from './Styles';

const SettingGeneral = () => {
  const { user } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      username: user?.username,
      email: user?.email,
      address: user?.address,
      date: new Date(user?.date || ''),
      numberPhone: user?.phone,
    },
    onSubmit: async (values) => {
      setLoading(true);
      const action = await dispatch(
        editUserInfo({
          username: values.username,
          email: values.email,
          address: values.address,
          date: values.date,
          phone: values.numberPhone,
        }),
      );

      if (editUserInfo.fulfilled.match(action)) {
        setLoading(false);
        setOpen(true);
      }

      if (editUserInfo.rejected.match(action)) {
        setLoading(false);
      }
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Bạn không được để trống thông tin này.'),
      email: Yup.string().email('Email không hợp lệ').required('Bạn không được để trống thông tin này.'),
      date: Yup.date()
        .nullable()
        .typeError('Ngày không hợp lệ.')
        .max(new Date(), 'Bạn không thể sinh ở trong tương lai.')
        .min(new Date(1900), 'Bạn đã vượt quá giới hạn tuổi cho phép.'),
      numberPhone: Yup.string()
        .nullable()
        .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ.'),
    }),
  });

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          formik.setErrors({
            address: undefined,
            date: undefined,
            email: undefined,
            numberPhone: undefined,
            username: undefined,
          });
        }}
      >
        <SettingAccountContainer>
          <Title>Cài đặt chung</Title>
          <FormWrap>
            <form onSubmit={formik.handleSubmit}>
              <Stack sx={{ flexDirection: 'row', gap: '2.4rem', alignItems: 'flex-start' }}>
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
              <Stack sx={{ flexDirection: 'row', gap: '2.4rem', alignItems: 'flex-start' }}>
                <DatePicker
                  className="date-picker"
                  onChange={(newValue) => {
                    formik.setFieldValue('date', moment(newValue).toISOString());
                  }}
                  value={formik.values.date}
                  renderInput={({ inputRef, inputProps, onChange, value, error }) => {
                    return (
                      <DatePickerWrap>
                        <InputField
                          label="Ngày sinh"
                          id="date"
                          name="date"
                          icon={<MdDateRange />}
                          onChange={onChange}
                          ref={inputRef}
                          value={value}
                          inputProps={inputProps}
                          error={formik.touched.date && formik.errors.date}
                          errorText={formik.errors.date}
                          onBlur={formik.handleBlur}
                        />
                        {/* <div>{InputProps?.endAdornment}</div> */}
                      </DatePickerWrap>
                    );
                  }}
                />
                <InputField
                  label="Số điện thoại"
                  id="numberPhone"
                  name="numberPhone"
                  icon={<BsPhone />}
                  onChange={formik.handleChange}
                  value={formik.values.numberPhone}
                  onBlur={formik.handleBlur}
                  type="tel"
                  error={formik.touched.numberPhone && formik.errors.numberPhone}
                  errorText={formik.errors.numberPhone}
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
                Đảm bảo điền vào cài đặt vị trí của bạn. Điều này sẽ giúp chúng tôi gợi ý cho bạn những người bạn có liên
                quan và những địa điểm bạn có thể thích.
              </p>
              <ButtonSaveChange type="submit" disabled={!(formik.isValid && formik.dirty)}>
                {loading ? 'Loading...' : 'Lưu thay đổi'}
              </ButtonSaveChange>
            </form>
            <Illustration>
              <IMG.SettingGeneral />
              <p>
                Nếu bạn muốn tìm hiểu thêm về cài đặt chung, bạn có thể đọc về cài đặt này trong{' '}
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
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%', fontSize: '1.4rem', fontWeight: '500' }}>
          Chỉnh sửa thành công
        </Alert>
      </Snackbar>
    </>
  );
};

export default SettingGeneral;
