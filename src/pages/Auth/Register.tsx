import { useFormik } from 'formik';
import { useAppDispatch } from 'hooks/hooks';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { authSelector, registerHandler } from '../../features/authSlice';
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
      console.log(values);
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
          <h1>Register</h1>
          {register.error && <div className="error-login">{register.error}</div>}
          <form className="auth__form" onSubmit={formik.handleSubmit}>
            <div className="input__group">
              <label htmlFor="userName">User Name</label>
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
              <label htmlFor="password">Password</label>
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
              <label htmlFor="confirmPassword">Confirm password</label>
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
              {register.loading ? 'Loading...' : 'Register'}
            </button>
          </form>
          <p className="register-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
