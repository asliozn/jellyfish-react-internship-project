import Button from 'react-bootstrap/Button';
import React, {useState} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbarjelly from '../components/Navbarjelly';


const ArticleBannerStyle = {
    backgroundColor: '#7a76abbf',
    backgroundPosition: 'center',
    height: '25vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    float: 'left',
    boxShadow: 'inset 0 8px 8px -8px rgb(0 0 0 / 20%),inset 0 -8px 8px -8px rgb(0 0 0 / 20%)',
    color: 'white',
    marginBottom: '4%',
    paddingTop: '2%',
    paddingLeft: '5%',
}

const imageStyle2 = {
    display: 'inline-block',
    verticalAlign: 'middle',
    height: '32px',
    width: '32px',
    borderRadius: '30px',
    marginRight: '1rem',
}

const linkStyle = {
        textDecoration: "none",
        color: '#6963AD',
        padding: '0.25rem 0.5rem',
        fontSize: '0.875rem',
        marginRight: '1rem',
      };

      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user);

const Article = () => {

        const user = JSON.parse(localStorage.getItem('user'));


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
        <>
        <div style={ArticleBannerStyle}>
        <h3>Article Name</h3>
        <div>
            <a href='/user'><img
            src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" style={imageStyle2} alt="profile" /></a>
            
            <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
            <a href='/user' style={linkStyle}>User Name</a>
            <span style={{    color: '#bbb',
            fontSize: '0.8rem',
             display: 'block'}}>
                 August 8, 2022</span>
            </div>



        {user ? (<span>
            <Button variant='outline-secondary' size='sm' style={{marginRight:'1rem'}} href="/editor"> Edit Article</Button>
            <Button variant="outline-danger" size='sm' style={{marginRight:'1rem'}}>Delete Article</Button>
        </span> ):(  <span>
            <Button variant='outline-secondary' size='sm' style={{marginRight:'1rem'}}> Favorite</Button>
            <Button variant="outline-secondary" size='sm' style={{marginRight:'1rem'}} >Follow</Button>
        </span>
        )}

        </div>
        </div>

        <Container>
            <Row className='article-content'>

                <Col>
                    <p>Article content</p>

                    <ul> taglist </ul>
                </Col>
            
            </Row>
           <hr/>
           <div>
            
                <a href='/user'><img
                src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" style={imageStyle2} alt="profile" /></a>
                
                <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
                <a href='/user' style={linkStyle}>User Name</a>
                <span style={{    color: '#bbb',
                fontSize: '0.8rem',
                display: 'block'}}>
                    August 8, 2022</span>
                </div>

        
                <span>
                    <Button variant='outline-secondary' size='sm' style={{marginRight:'1rem'}} href="/editor"> Edit Article</Button>
                    <Button variant="outline-danger" size='sm' style={{marginRight:'1rem'}}>Delete Article</Button>
                </span>
                <span>
                    <Button variant='outline-secondary' size='sm' style={{marginRight:'1rem'}}> Favorite</Button>
                    <Button variant="outline-secondary" size='sm' style={{marginRight:'1rem'}} >Follow</Button>
                </span>
           </div>


            <Row>
                <Col>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlID='validationCustom01'>
                 <Form.Control as="textarea" rows={3} placeholder='Write a comment...' required/>
                 <Form.Control.Feedback type="invalid">
                    Please enter a comment.
                    </Form.Control.Feedback>
                 </Form.Group>
                 <Button variant="primary" type="submit" style={{backgroundColor:'#6963AD', borderColor:'#6963AD', float:'right', marginBottom:'2%'}}>
                    Post Comment
                </Button>
                </Form>
                </Col>
                
                <div style={{border: '1px solid #e5e5e5'}} >
                    
                    <div>
                        <p style={{paddingTop:'2%'}}>comeeeeeeee
                        eeeeeeeeeeeent</p>
                    </div>

                    <span>
                        <a href='/user'><img
                        src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" style={imageStyle2} alt="profile" /></a>
                        
                        <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
                        
                            <a href='/user' style={linkStyle}>User Name</a>
                            
                            <span style={{    color: '#bbb',fontSize: '0.8rem',display: 'block'}}>August 8, 2022</span>
                            
                        </div>
                    </span>

                </div>
            </Row>
        </Container>

        </>
    );
}
export default Article;