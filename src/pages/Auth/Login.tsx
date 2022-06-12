import { authSelector, loginGoogleHandler, loginHandler } from 'features/authSlice';
import { startConnecting } from 'features/socketSlice';
import { useFormik } from 'formik';
import { useAppDispatch } from 'hooks/hooks';
import React, { useEffect } from 'react';
//Google Login
import { useGoogleLogin } from 'react-google-login';
import { AiFillFacebook } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clientId } from 'share/types';
import * as Yup from 'yup';
import './Auth.scss';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, login } = useSelector(authSelector);
  const { signIn } = useGoogleLogin({
    clientId,
    async onSuccess(res: any) {
      const action = await dispatch(
        loginGoogleHandler({
          accessToken: res.tokenId,
          callback: () => {
            navigate('/', {
              replace: true,
            });
          },
        }),
      );
      if (loginGoogleHandler.fulfilled.match(action)) {
        dispatch(startConnecting());
      }
    },
    isSignedIn: true,
    cookiePolicy: 'single_host_origin',
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    //call back here
    onSubmit: async (values, actions) => {
      const action = await dispatch(
        loginHandler({
          email: values.email,
          password: values.password,
          callback: () => {
            navigate('/', {
              replace: true,
            });
          },
        }),
      );
      if (loginHandler.fulfilled.match(action)) {
        dispatch(startConnecting());
      }
      actions.resetForm();
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address.').required('You must enter your email.'),
      password: Yup.string().required('You must enter your password'),
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
          <Link to="/lading" className="logo">
            isekai
          </Link>
          <h1>Đăng nhập</h1>
          {login?.error && <div className="error-login">{login?.error}</div>}
          <div className="btns__provider">
            <button onClick={() => signIn()}>
              <FcGoogle />
              <span>Tiếp tục với Google</span>
            </button>
            <button>
              <AiFillFacebook color="#3c5a99" />
              <span>Tiếp tục với Facebook</span>
            </button>
          </div>
          <div className="line">
            <span>Hoặc</span>
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
              <label htmlFor="password">Mật khẩu</label>
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
              {login.loading ? 'Loading...' : 'Đăng nhập'}
            </button>
          </form>
          <Link to="/forgot-password" className="forgot-password ">
            Quên mật khẩu
          </Link>
          <p className="register-link">
            Không có tài khoản? <Link to="/register">Đăng kí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
