import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Anchor } from "react-bootstrap";

const ProfilePage = () => {

    const linkStyle = {
        textDecoration: "none",
        color: '#6963AD',
        float: 'right',
        border: '1px solid #6963AD',
        padding: '0.25rem 0.5rem',
        borderRadius: '5px',
        fontSize: '0.875rem',
      };
      const imageStyle = {
        borderTopLeftRadius: '50% 50%', borderTopRightRadius: '50% 50%',
        borderBottomRightRadius: '50% 50%', borderBottomLeftRadius: '50% 50%',
        width: '100px',
        height: '100px',
        borderRadius: '100px',
        marginBottom: '1rem'
        }

    return (
    <>
        <div className="user-container" style={{color: '#6963AD',marginBottom: '2%'}}>
            <div className="row">
                <div className="col-md-12">
                <img src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" style={imageStyle} alt="profile picture" />
                <h4>user name</h4>
                <p>user bio</p>
                <Button size="sm" style={{backgroundColor:'#6963AD', borderColor:'#6963AD', float:'right'}}>Follow Button</Button>
                <a href="/settings" style={linkStyle}> Go to Settings</a>
            </div>
        </div>
        </div>      
        <Container style={{marginLeft:'10%', marginRight:'5%'}}>
            <Row>
            <Col sm={9} xs={12}>
                <div>    

                    <ul className="profile-page-list">
                        <li style={{float: 'left',    display: 'list-item', }}>
                          <a href="/" className= 'profile-page-anchor'>My Articles </a>
                        </li>
                        <li>
                        <a href="/" className= 'profile-page-anchor'>Favorited Articles</a>
                        </li>
                    </ul>
                                     

                    <article style={{borderTop:' 1px solid rgba(0,0,0,0.1)',clear: 'both'}}>
                        
                        <h5>Welcome to JellyFish!</h5>
                        <p>
                            JellyFish is a place to share your thoughts and ideas.
                            It is a place to connect with other people and share your ideas.
                            It is a place to share your ideas and thoughts with other people.
                            It is a place to share your ideas and thoughts with other people.
                            It is a place to share your ideas and thoughts with other people.
                            It is a place to share your ideas and thoughts with other people.
                            It is a place to share your ideas and thoughts with other people.
                        </p>
                        <a href="/article" className= 'profile-page-anchor'>Read More</a>
                    </article>
                </div>
            </Col>
        </Row>
        </Container>
    </>
    );
}
export default ProfilePage;