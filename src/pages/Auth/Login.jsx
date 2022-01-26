import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authSelector, loginHandler } from '../../features/authSlice';

import './Auth.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, login } = useSelector(authSelector);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values, actions) => {
      dispatch(
        loginHandler({
          email: values.email,
          password: values.password,
          callback: () => {
            navigate('/home', {
              replace: true,
            });
          },
        }),
      );
      actions.resetForm({
        email: '',
        password: '',
      });
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address.').required('You must enter your email.'),
      password: Yup.string().required('You must enter your password'),
    }),
  });

  useEffect(() => {
    if (token.accessToken) {
      navigate('/home');
    }
  }, [token.accessToken, navigate]);

  return (
    <div className="auth">
      <div className="container">
        <div className="auth__container">
          <h1>Login</h1>
          {login.error && <div className="error-login">{login.error}</div>}
          <div className="btns__provider">
            <button>
              <FcGoogle />
              <span>Continue with Google</span>
            </button>
            <button>
              <AiFillFacebook color="#3c5a99" />
              <span>Continue with Facebook</span>
            </button>
          </div>
          <div className="line">
            <span>Or</span>
          </div>
          <form className="auth__form" onSubmit={formik.handleSubmit}>
            <div className="input__group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
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
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
              ) : null}
            </div>
            <button type="submit" disabled={!(formik.dirty && formik.isValid)}>
              {login.loading ? 'Loading...' : 'Login'}
            </button>
          </form>
          <Link to="/forgot-password" className="forgot-password ">
            Forgot your password
          </Link>
          <p className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
