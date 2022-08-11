/* eslint-disable no-template-curly-in-string */
import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';


const Settings = () => {

  const config = {
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpbGFsb2xhQGhvdG1haWwuY29tIiwidXNlcm5hbWUiOiJsaWxhbG9sYTU2IiwiaWF0IjoxNjYwMjE3OTEzLCJleHAiOjE2NjU0MDE5MTN9.RLUZzaSuTRcnOoVkWD1AvatgYp_ejI1L6ijJtb4ahTQ`}
  }
  
    const registerHandler = async (values, { setSubmitting }) => {
    const payload = {
      "user": {
        "email": values.email,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpbGFsb2xhQGhvdG1haWwuY29tIiwidXNlcm5hbWUiOiJsaWxhbG9sYTU2IiwiaWF0IjoxNjYwMjE3OTEzLCJleHAiOjE2NjU0MDE5MTN9.RLUZzaSuTRcnOoVkWD1AvatgYp_ejI1L6ijJtb4ahTQ",
        "username": values.username,
        "bio": values.bio,
        "image": values.url,
      }
  
      // make payload here using values
    }
    try {
      const response = await axios.put('https://api.realworld.io/api/user', payload,config)
      console.log(response.data)
    } catch (e) {
      console.log(e)
    } finally {
      setSubmitting(false)
    }
  }

return(
  <Formik
    initialValues={{ email: "", password: "" , username: "",bio:"",url:""}}
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
    .matches(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/, "Password must contain a number a special character."),

    bio: Yup.string()
    .required("Required")
    .min(50, "Bio is too short - should be 50 chars minimum."),
  username: Yup.string()
    .required("Required") 
    .min(8, "Username is too short - should be 8 chars minimum.")
    .max(16, "Username is too long - should be 16 chars maximum."),
    url: Yup.string()
    .url("Invalid url")
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
        <div style={{margin: 'auto', width: '50%'}}>

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control size="sm" type="text" name="url" 
            value={values.url}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="URL of your profile picture"
            className={'form-control mt-1 ${errors.url && touched.url && "error"}'}
            />
                {errors.url && touched.url && (
            <div className="input-feedback" style={{color:'red'}}>{errors.url}</div>
            )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" 
            name="username"
            // eslint-disable-next-line no-template-curly-in-string
            className={'form-control mt-1 ${errors.username && touched.username && "error"}'}
            placeholder="e.g lilalola"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur} />
             {errors.username && touched.username && (
            <div className="input-feedback" style={{color:'red'}}>{errors.username}</div>
            )}
        
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} type="text" 
            placeholder="Short bio about you!" 
            name="bio"
            className={'form-control mt-1 ${errors.bio && touched.bio && "error"}'}
            value={values.bio}
            onChange={handleChange}
            onBlur={handleBlur} />
            {errors.bio && touched.bio && (
            <div className="input-feedback" style={{color:'red'}}>{errors.bio}</div>
            )}
         
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="email" placeholder="Your email"
            name="email"
            className={'form-control mt-1 ${errors.email && touched.email && "error"}'}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur} />
              {errors.email && touched.email && (
            <div className="input-feedback" style={{color:'red'}}>{errors.email}</div>
            )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="password" 
            placeholder="New Password"
            name="password"
            className={'form-control mt-1 ${errors.password && touched.password && "error"}'}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur} />
              {errors.password && touched.password && (
            <div className="input-feedback" style={{color:'red'}}>{errors.password}</div>
          )}
            </Form.Group>

            <Button variant="primary" type="submit" style={{backgroundColor:'#6963AD', borderColor:'#6963AD', float:'right'}}>
            Update Settings
            </Button>
        </Form>

        <Button style={{color: '#B85C5C',backgroundColor: 'transparent', borderColor: '#B85C5C'}}> Click here to logout!</Button>

        </div>
        </>
    ); } }
    </Formik>
);
}
    export default Settings