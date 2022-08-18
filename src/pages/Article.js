import Button from 'react-bootstrap/Button';
import React, {useState,useEffect} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbarjelly from '../components/Navbarjelly';
import { useParams , Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {fetchArticle} from '../store/actions/article';
import { fetchCommentsBySlug,addComment,deleteComment } from '../store/actions/comment';

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
        const [value, setValue] = useState();        
        const onInput = ({target:{value}}) => setValue(value);

        const handleSubmit = (event) => {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            }
            setValidated(true);
            dispatch(addComment(articleSlug, value));
          
        };

    return (
        <>
        <Navbarjelly />

        <div className='article-banner-style'>
                
            <h1>{article?.title}</h1>
            <div>
                <a href='/user'><img
                src= {article?.author.image} className='home-page-image-style' alt="profile" /></a>
                
                <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
                <a href='/user' className='home-page-link-style'>{article?.author.username}</a>
                <span style={{    color: '#bbb',
                fontSize: '0.8rem',
                display: 'block'}}>
                        {article?.createdAt}</span>
                </div>
                <Link  to={`/editor/${article?.slug}`}> Edit Article</Link>

            {article?.author.username === user.username ? (<span>
                <Link  to={`/editor/${article?.slug}`}> Edit Article</Link>
                <Button variant="outline-danger" size='sm' style={{marginRight:'1rem'}}>Delete Article</Button>
            </span> ):(  
            <span style={{marginLeft:'2rem'}}>
                <button   className='article-buttons'> Favorite</button>
                <button className='article-buttons'>Follow</button>
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
            src= {article?.author.image} className='home-page-image-style' alt="profile" /></a>
            
            <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
            <a href='/user' className='home-page-link-style'>{article?.author.username}</a>
            <span style={{    color: '#bbb',
            fontSize: '0.8rem',
             display: 'block'}}>
                    {article?.createdAt}</span>
            </div>

            {article?.author.username === user.username ? (<span>
                <Link  to={`/editor/${article.slug}`}> Edit Article</Link>
                <Button variant="outline-danger" size='sm' style={{marginRight:'1rem'}}>Delete Article</Button>
            </span> ):(  
            <span style={{marginLeft:'2rem'}}>
                <button   className='article-buttons'> Favorite</button>
                <button className='article-buttons'>Follow</button>
            </span>
            )}
        </div>


           


           {user ? (
            <>

                <div>
                            
                <a href='/user'><img
                src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" className='home-page-image-style' alt="profile" /></a>

                <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
                <a href='/user' className='home-page-link-style'>{user?.username}</a>
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
                 <Form.Control as="textarea" rows={3} 
                 placeholder='Write a comment...'
                 onChange={onInput} 
                 value={value}
                  required/>
                 <Form.Control.Feedback type="invalid">
                    Please enter a comment.
                    </Form.Control.Feedback>
                 </Form.Group>
                 <Button variant="primary" type="submit" 
                 style={{backgroundColor:'#6963AD', borderColor:'#6963AD', float:'right', marginBottom:'2%'}}>
                    Post Comment
                </Button>
                </Form>
                
                </Col>

            </Row>
            </>
      
          ):(  <span>
            <p style={{color:'red', textAlign:'center'}}>Sign in or sign up to add comments on this article.</p>
        </span>
        )}
        
                
                <div style={{display: 'flex',justifyContent: 'center',}} >

                    <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between', padding: '1rem',}}>

                    {comments?.map(comment => (
                        <div style={{border: '1px solid #e5e5e5'}}key={comment.id}>
                            <div>
                                <a href='/user'><img
                                src={comment?.author.image}  className='home-page-image-style' alt="profile" /></a>
                                <div style={{display: 'inline-block', verticalAlign: 'middle',}}>
                                <a href='/user' className='home-page-link-style'>{comment.author.username}</a>
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