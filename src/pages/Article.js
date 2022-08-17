import Button from 'react-bootstrap/Button';
import React, {useState,useEffect} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbarjelly from '../components/Navbarjelly';
import { useParams } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {fetchArticle} from '../store/actions/article';
import { fetchCommentsBySlug } from '../store/actions/comment';

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

const tagStyle ={
    backgroundColor: '#AA86D5',
    textAlign: 'center',
    borderRadius: '10px',
    borderColor:'white',
    margin: '5px',
    padding: '5px',
    color: 'white',
    fontSize: '13px',
    textDecoration: 'none',
    width: '15%',
    float: 'right',
}

const linkStyle = {
        textDecoration: "none",
        color: '#6963AD',
        padding: '0.25rem 0.5rem',
        fontSize: '0.875rem',
        marginRight: '1rem',
        fontWeight: '600',
      };

      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user);

const Article = () => {

    let { articleSlug } = useParams();
    console.log(articleSlug);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArticle(articleSlug));
        console.log(articleSlug+"articleSlug");
        dispatch(fetchCommentsBySlug(articleSlug));
    } , [articleSlug, dispatch]);

    const article = useSelector(state => state.article.article.article);
    const comments = useSelector(state => state.comment.comments.comments);
    console.log(article);

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
        <Navbarjelly />

        <div style={ArticleBannerStyle}>
                
            <h1>{article?.title}</h1>
            <div>
                <a href='/user'><img
                src= {article?.author.image} style={imageStyle2} alt="profile" /></a>
                
                <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
                <a href='/user' style={linkStyle}>{article?.author.username}</a>
                <span style={{    color: '#bbb',
                fontSize: '0.8rem',
                display: 'block'}}>
                        {article?.createdAt}</span>
                </div>

            {user ? (<span>
                <Button variant='outline-secondary' size='sm' style={{marginRight:'1rem'}} href="/editor"> Edit Article</Button>
                <Button variant="outline-danger" size='sm' style={{marginRight:'1rem'}}>Delete Article</Button>
            </span> ):(  
            <span style={{marginLeft:'2rem'}}>
                <Button variant='outline-secondary' size='sm' className='article-buttons'style={{marginRight:'1rem',fontWeight:'600',borderColor:'#7c78ac',color:'#7c78ac', borderWidth:'medium'}}> Favorite</Button>
                <Button variant="outline-secondary" size='sm'  className='article-buttons' style={{marginRight:'1rem',fontWeight:'600',borderColor:'#7c78ac',color:'#7c78ac', borderWidth:'medium' }} >Follow</Button>
            </span>
            )}

    

            </div>
        </div>

        <Container>
            <Row className='article-content'>

                <Col>
                    <p>{article?.body}</p>

                    {article?.tagList.map(tags => (  
                        <button key={tags.id} className='forHoverTag' style={{float:'right'}}>{tags}</button>
                    ))} 
                </Col>
            
            </Row>
           <hr/>

           {/*ikinci profil kısmı ortadaki*/ }

           <div style={{display: 'flex',justifyContent: 'center',marginBottom:'4%'}}>
            <a href='/user'><img
            src= {article?.author.image} style={imageStyle2} alt="profile" /></a>
            
            <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
            <a href='/user' style={linkStyle}>{article?.author.username}</a>
            <span style={{    color: '#bbb',
            fontSize: '0.8rem',
             display: 'block'}}>
                    {article?.createdAt}</span>
            </div>

            {user ? (<span>
                <Button variant='outline-secondary' size='sm' style={{marginRight:'1rem'}} href="/editor"> Edit Article</Button>
                <Button variant="outline-danger" size='sm' style={{marginRight:'1rem'}}>Delete Article</Button>
            </span> ):(  
            <span style={{marginLeft:'2rem'}}>
                <Button variant='outline-secondary' size='sm' className='article-buttons'style={{marginRight:'1rem',fontWeight:'600',borderColor:'#7c78ac',color:'#7c78ac', borderWidth:'medium'}}> Favorite</Button>
                <Button variant="outline-secondary" size='sm'  className='article-buttons' style={{marginRight:'1rem',fontWeight:'600',borderColor:'#7c78ac',color:'#7c78ac', borderWidth:'medium' }} >Follow</Button>
            </span>
            )}
        </div>


           


           {user ? (
            <>

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
            </Row>
            </>
      
          ):(  <span>
            <p style={{color:'red', textAlign:'center'}}>Please log in to comment</p>
        </span>
        )}
        
                
                <div style={{display: 'flex',justifyContent: 'center',}} >

                    <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between', padding: '1rem',}}>

                    {comments?.map(comment => (
                        <div style={{border: '1px solid #e5e5e5'}}key={comment.id}>
                            <div>
                                <a href='/user'><img
                                src={comment?.author.image} style={imageStyle2} alt="profile" /></a>
                                <div style={{display: 'inline-block', verticalAlign: 'middle',}}>
                                <a href='/user' style={linkStyle}>{comment.author.username}</a>
                                <span style={{    color: '#bbb',
                                fontSize: '0.8rem',
                                    display: 'block'}}>
                                    {comment.createdAt}</span>
                                </div>
                            </div>
                            <p>{comment.body}</p>
                        </div>
                    ))}
                </div>
                </div>
        </Container>

        </>
    );
}
export default Article