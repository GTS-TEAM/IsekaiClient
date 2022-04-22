import { isekaiApi } from 'api/isekaiApi';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import './Auth.scss';

const FogotPassword = () => {
  const [login, setLogin] = useState<any>();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    //call back here
    onSubmit: async (values) => {
      try {
        await isekaiApi.postForgetPassword(values.email);
      } catch (error: any) {
        setLogin('Email not found');
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address.').required('You must enter your email.'),
    }),
  });

  return (
    <div className="auth">
      <div className="container">
        <div className="auth__container">
          <h1>Find your account</h1>
          <form className="auth__form" onSubmit={formik.handleSubmit}>
            <div className="input__group">
              <label className="description" htmlFor="email">
                Please enter your email or mobile number to search for your account.
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                placeholder="Please enter your email address"
              />
              {login ? <div className="error-message">{login}</div> : null}
            </div>
            <button type="submit">Find now</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FogotPassword;
