/* eslint-disable no-template-curly-in-string */
import React from "react";
import { Link} from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbarjelly from "../components/Navbarjelly";
import { useTranslation } from 'react-i18next';



const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: '#6963AD'
  };

const SignUp = () => {
  const { t } = useTranslation();

  let navigate = useNavigate();

  const registerHandler = async (values, { setSubmitting }) => {
    console.log(values);
    const payload = {
      "user": {
        "username": values.username,
        "email": values.email,
        "password": values.password,
      }
    }
    try {
      const response = await axios.post('https://api.realworld.io/api/users', payload)
      console.log(response.data)
      navigate("/login");

    } catch (e) {
      console.log(e)
    } finally {
      setSubmitting(false)
    }
  }

  return(
   <Formik
      initialValues={{ email: "", password: "" , username: ""}}
      onSubmit={registerHandler}

  validationSchema={Yup.object().shape({
    email: Yup.string()
      .email()
      .required("Required")
      .matches(/\S+@\S+\.\S+/, "Invalid email address"),

    password: Yup.string()
      .required("No password provided.")
      .min(7, "Password is too short - should be 7 chars minimum.")
      .max(15, "Password is too long - should be 15 chars maximum.")
      .matches(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/, "Password must contain a number and a special character."),

    username: Yup.string()
      .required("Required") 
      .min(8, "Username is too short - should be 8 chars minimum.")
      .max(16, "Username is too long - should be 16 chars maximum.")

  })}
>
  {props => {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit
    } = props;


      return(
        <>
        <Navbarjelly />
      <div className="Auth-form-container">
      <form className="Auth-form"onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">{t('sign-up')}</h3>
          <div className="text-center">
          {t('already-registered')}{" "}
            <Link to="/login" style={linkStyle}>{t('sign-in')}</Link>
          </div>
          <div className="form-group mt-3">
            <label>{t('u-name')}</label>
            <input
              type="text"
              name="username"
              className={'form-control mt-1 ${errors.username && touched.username && "error"}'}
              placeholder="e.g lilalola"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.username && touched.username && (
            <div className="input-feedback" style={{color:'red'}}>{errors.username}</div>
            )}
          </div>
          <div className="form-group mt-3">
            <label>{t('u-email')}</label>
            <input
              type="email"
              name="email"
              className={'form-control mt-1 ${errors.email && touched.email && "error"}'}
              placeholder="Email Address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
             {errors.email && touched.email && (
            <div className="input-feedback" style={{color:'red'}}>{errors.email}</div>
            )}
          </div>


          <div className="form-group mt-3">
            <label>{t('u-password')}</label>
            <input
              type="password"
              name="password"
              className={'form-control mt-1 ${errors.password && touched.password && "error"}'}
              placeholder="Password"
              value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <div className="input-feedback" style={{color:'red'}}>{errors.password}</div>
          )}
       
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" style={{backgroundColor:'#6963AD', borderColor:'#6963AD'}}>
            {t('sign-up')}
            </button>
          </div>
        </div>
      </form>
    </div>
    </>); }}
  </Formik>
);
}
     
export default SignUp