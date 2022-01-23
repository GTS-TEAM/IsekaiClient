import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import './Auth.scss';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    dispatch(login({ email, password }));
  };

  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const changePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <div className="container">
        <div className="login__container">
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
              <input
                type="email"
                name="email"
                id="email"
                onChange={changeEmailHandler}
              />
            </div>
            <div className="input__group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={changePasswordHandler}
              />
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
