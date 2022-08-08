import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Editor = () => {


  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

    return (
      <div style={{margin: 'auto', width: '50%'}}>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control size="lg" type="text" placeholder="Article Title" required />
        <Form.Control.Feedback type="invalid">
              Please enter a title.
            </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Control type="text" placeholder="What's this article about?"  required />
      <Form.Control.Feedback type="invalid">
              Please enter a description.
            </Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Control as="textarea" rows={3} type="text" placeholder="Write your article (in markdown)"  required/>
      <Form.Control.Feedback type="invalid">
              Please write your article.
            </Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Control type="text" placeholder="Enter Tags" />
      </Form.Group>
      
      <Button variant="primary" type="submit" style={{backgroundColor:'#6963AD', borderColor:'#6963AD', float:'right'}}>
        Publish Article
      </Button>
    </Form>
    </div>
    );
    }

export default Editor;
