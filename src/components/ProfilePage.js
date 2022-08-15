/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useState,useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbarjelly from "./Navbarjelly";

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

        const user1 = JSON.parse(localStorage.getItem('user'));

        const config = {
            headers: { Authorization: `Bearer ${user1.token}` }
          }
          
          const [user, setUser] = useState([]);
          const [loading, setLoading] = useState(true);
          const [error, setError] = useState(null);

          const fetchUser = async () => {
              setLoading(true);
              setError(null);
              try {
                  const res = await fetch('https://api.realworld.io/api/user', config);
                  const data = await res.json();
                  setUser(data.user);
                  setLoading(false);
              } catch (error) {
                  setError(error.message);
                  setLoading(false);
              }
          }

          useEffect(() => {
            fetchUser();
        } , []);
        
        if (loading) {
            return <div>Loading...</div>;
        }
        if (error) {
            return <div>{error}</div>;
        }
    
    return (
    
    <>
    <Navbarjelly />


        <div className="user-container" style={{color: '#6963AD',marginBottom: '2%'}}>
            <div className="row">
                <div className="col-md-12">
                <img src={user.image} style={imageStyle} alt="profile picture" />
                    <h4>{user.username}</h4>
                    <p>{user.bio}</p>
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
                        <p style={{color:'grey'}}>
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