/* eslint-disable no-template-curly-in-string */
import React, {useState}  from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbarjelly from "../components/Navbarjelly";


const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: '#6963AD'
  };
  
const Login = () => {

  const [error, setError] = useState(false);

  let navigate = useNavigate();
  const loginHandler = async (values, { setSubmitting }) => {

    const payload = {
      "user": {
        "email": values.email,
        "password": values.password,
      }
      // make payload here using values
    }

    try {
      const response = await axios.post( 'https://api.realworld.io/api/users/login', payload);
      console.log(response.data)
      //console.log(JSON.stringify(response));
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      localStorage.setItem('token', JSON.stringify(response?.data?.user?.token));
      navigate('/')
  } catch (error) {
      if (!error?.response) {
           setError('No Server Response');
      } else if (error.response?.status === 400) {
          setError('Missing Username or Password');
      } else if (error.response?.status === 401) {
          setError('Unauthorized');
      } else {
          setError('Login Failed');
      }
      console.log(error);
    }
      finally {
        setSubmitting(false)
      }

    }
  

  return(
  <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={loginHandler}
  validationSchema={Yup.object().shape({
    email: Yup.string()
      .email()
      .required("Required")
      .matches(/\S+@\S+\.\S+/, "Invalid email address"),
    password: Yup.string()
      .required("No password provided.")     
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
    return (
      <>

<Navbarjelly />

        <div className="Auth-form-container">
            <form className="Auth-form"onSubmit={handleSubmit} >
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Not registered?{" "}
                        <Link to="/register" style={linkStyle}>Sign Up</Link>
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
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
                        <label>Password</label>
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
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
      </>
    );  
    
  }}

  </Formik>);

};

export default Login;
