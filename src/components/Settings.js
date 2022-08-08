import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



const Settings = () => {

    return (
<>
        <div style={{margin: 'auto', width: '50%'}}>

        <Form>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control size="sm" type="text" placeholder="URL of your profile picture"  />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="username"   />
           
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} type="text" placeholder="Short bio about you!"  />
         
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="email" placeholder="Your email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="password" placeholder="New Password" />
            </Form.Group>

            <Button variant="primary" type="submit" style={{backgroundColor:'#6963AD', borderColor:'#6963AD', float:'right'}}>
            Update Settings
            </Button>
        </Form>

        <Button style={{color: '#B85C5C',backgroundColor: 'transparent', borderColor: '#B85C5C'}}> Click here to logout!</Button>

        </div>
        </>
    );
    }
    export default Settings;