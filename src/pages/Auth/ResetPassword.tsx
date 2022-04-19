import { isekaiApi } from 'api/isekaiApi';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';
import './Auth.scss';

const ResetPassword = () => {
  const navigate = useNavigate();

  let [searchParams] = useSearchParams();
  let [token, setToken] = useState<any>();
  useEffect(() => {
    setToken(searchParams.get('token'));
  }, [searchParams]);
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      try {
        let newObj: any = {
          password: values.password,
          token: token,
        };
        await isekaiApi.patchResetPassword(newObj);
        navigate('/login', {
          replace: true,
        });
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('You must enter your password.')
        .min(6, 'Password is too short - should be 6 chars minimum.'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Confirm password is require.'),
    }),
  });

  return (
    <div className="auth">
      <div className="container">
        <div className="auth__container">
          <h1>Reset your password</h1>
          <form className="auth__form" onSubmit={formik.handleSubmit}>
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
            <button type="submit">Reset now</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
