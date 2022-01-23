import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import './Auth.scss';
import { useDispatch } from 'react-redux';
import { authSelector, login } from '../../features/authSlice';
import { useSelector } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector(authSelector);

  const submitHandler = (e) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    dispatch(
      login({
        email,
        password,
        callback: () => {
          navigate('/', {
            replace: true,
          });
        },
      }),
    );
  };

  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const changePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="auth">
      <div className="container">
        <div className="auth__container">
          <h1>Login</h1>
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
          <form action="#" className="auth__form" onSubmit={submitHandler}>
            <div className="input__group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={changeEmailHandler} />
            </div>
            <div className="input__group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" onChange={changePasswordHandler} />
            </div>
            <button>Login</button>
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
