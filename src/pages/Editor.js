/* eslint-disable no-template-curly-in-string */
import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import Navbarjelly from "../components/Navbarjelly";
import {useDispatch} from 'react-redux';
import {createArticle} from '../store/actions/post';


const Editor = () => {

  const dispatch = useDispatch();

    const registerHandler = async (values, { setSubmitting }) => {      
     dispatch(createArticle(values));
      setSubmitting(false);
  }

return (
  <Formik
  initialValues={{title: "", body: "", description: ""}}
  onSubmit={registerHandler}

validationSchema={Yup.object().shape({

  title: Yup.string()
  .required("Required") 
  .min(8, "Title is too short - should be 8 chars minimum."),
  description: Yup.string()
  .required("Required") 
  .min(16, "Description is too short - should be 16 chars minimum."),
  body: Yup.string()
  .required("Required") 
  .min(50, "Body is too short. - should be 50 chars minimum.")

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

      <div style={{margin: 'auto', width: '50%', marginTop:'2rem'}}>

      <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control size="lg" type="text" name="title"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        className={'form-control mt-1 ${errors.username && touched.username && "error"}'}

        placeholder="Article Title" />

         {errors.title && touched.title && (
            <div className="input-feedback" style={{color:'red'}}>{errors.title}</div>
            )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Control type="text" 
      placeholder="What's this article about?" 
      name="description"
        value={values.description}
        className={'form-control mt-1 ${errors.username && touched.username && "error"}'}
        onChange={handleChange}
        onBlur={handleBlur}  />

          {errors.description && touched.description && (
            <div className="input-feedback" style={{color:'red'}}>{errors.description}</div>
            )}
    
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Control as="textarea" rows={3} type="text" 
         placeholder="Write your article (in markdown)"  
        name="body"
        className={'form-control mt-1 ${errors.username && touched.username && "error"}'}
        value={values.body}
        onChange={handleChange}
        onBlur={handleBlur}/>
         {errors.body && touched.body && (
            <div className="input-feedback" style={{color:'red'}}>{errors.body}</div>
            )}
  
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Control type="text" placeholder="Enter Tags" />
      </Form.Group>
      
      <Button variant="primary" type="submit" style={{backgroundColor:'#6963AD', borderColor:'#6963AD', float:'right'}}>
        Publish Article
      </Button>
    </Form>
    </div>
    </>
    );
    }}

    </Formik>);
}

export default Editor;
