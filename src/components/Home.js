import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const bannerStyle = {
    backgroundColor: '#AA86D5',
    backgroundPosition: 'center',
    height: '30vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    boxShadow: 'inset 0 8px 8px -8px rgb(0 0 0 / 30%),inset 0 -8px 8px -8px rgb(0 0 0 / 30%)',
    color: 'white',
    textShadow: '2px 2px rgb(0 0 0 / 30%)',
    marginBottom: '4%'
}

const tags ={
    backgroundColor: '#AA86D5',
    textAlign: 'center',
    borderRadius: '10px',
    margin: '5px',
    padding: '5px',
    color: 'white',
    fontSize: '13px',
    wordWrap: 'break-word',
}


const Home = () => {
    return (
        <>
        <div style={bannerStyle}>
        <h1>JellyFish</h1>
        <h2>A place to share your thoughts</h2>
        </div>

        <Container style={{marginLeft:'10%', marginRight:'5%'}}>
            <Row>
            <Col sm={9} xs={12}>
                <div>                    
                    <h5><a href="/" style={{ textDecoration: "none",color: '#6963AD'}}>Global Feed </a></h5>

                    <article style={{borderTop:' 1px solid rgba(0,0,0,0.1)'}}>
                        
                        <h6>Welcome to JellyFish!</h6>
                        <p>
                            JellyFish is a place to share your thoughts and ideas.
                            It is a place to connect with other people and share your ideas.
                            It is a place to share your ideas and thoughts with other people.
                            It is a place to share your ideas and thoughts with other people.
                            It is a place to share your ideas and thoughts with other people.
                            It is a place to share your ideas and thoughts with other people.
                            It is a place to share your ideas and thoughts with other people.
                        </p>
                    </article>
                </div>
            </Col>
            <Col sm={3} xs={12} >
                <div style={{backgroundColor:'#F1EAF6',width:'100%',textAlign:'center',paddingBottom:'15px',
                color: '#6963AD',borderRadius: '15px'}}>
                    <h6>Popular Tags</h6>
                    <a style={tags}>hello</a>
                    <a style={tags}>annyong</a>
                    <a style={tags}>bonjour</a>
                    <a style={tags}>mi amore</a>

                </div>
            </Col>
            </Row>
        </Container>



        </>
    );
    }

export default Home;
