import { authSelector, registerHandler } from 'features/authSlice';
import { useFormik } from 'formik';
import { useAppDispatch } from 'hooks/hooks';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './Auth.scss';
const Register = () => {
  const dispatch = useAppDispatch();
  const { token, register } = useSelector(authSelector);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values, actions) => {
      dispatch(
        registerHandler({
          userName: values.userName,
          email: values.email,
          password: values.password,
          callback: () => {
            navigate('/login', {
              replace: true,
            });
          },
        }),
      );
      actions.resetForm();
    },
    validationSchema: Yup.object({
      userName: Yup.string().required('You must enter your name.'),
      email: Yup.string().email('Invalid email address.').required('You must enter your email.'),
      password: Yup.string()
        .required('You must enter your password.')
        .min(6, 'Password is too short - should be 6 chars minimum.'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Confirm password is require.'),
    }),
  });

  useEffect(() => {
    if (token.access_token) {
      navigate('/');
    }
  }, [token.access_token, navigate]);

  return (
    <div className="auth">
      <div className="container">
        <div className="auth__container">
          <h1>Đăng kí</h1>
          {register?.error && <div className="error-login">{register?.error}</div>}
          <form className="auth__form" onSubmit={formik.handleSubmit}>
            <div className="input__group">
              <label htmlFor="userName">Tên</label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${formik.touched.userName && formik.errors.userName ? 'error' : ''}`}
              />
              {formik.touched.userName && formik.errors.userName ? (
                <div className="error-message">{formik.errors.userName}</div>
              ) : null}
            </div>
            <div className="input__group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${formik.touched.email && formik.errors.email ? 'error' : ''}`}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="input__group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${formik.touched.password && formik.errors.password ? 'error' : ''}`}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="input__group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'error' : ''}`}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="error-message">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <button type="submit" disabled={!(formik.dirty && formik.isValid)}>
              {register?.loading ? 'Loading...' : 'Đăng kí'}
            </button>
          </form>
          <p className="register-link">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
