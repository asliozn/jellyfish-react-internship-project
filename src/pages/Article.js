import Button from 'react-bootstrap/Button';
import React, {useState,useEffect} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbarjelly from '../components/Navbarjelly';
import { useParams , Link,useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {fetchArticle} from '../store/actions/article';
import { fetchCommentsBySlug,addComment,deleteComment} from '../store/actions/comment';
import {Alert} from 'react-bootstrap';
import { likeArticle } from '../store/actions/post';
import {deleteArticle} from '../store/actions/article';
import { useTranslation } from 'react-i18next';

     
const Article = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();


    const { t } = useTranslation();


    let { articleSlug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArticle(articleSlug));
        dispatch(fetchCommentsBySlug(articleSlug));
    } , []);

    const article = useSelector(state => state.article.article.article);
    const comments = useSelector(state => state.comment.comments.comments);


        const [validated, setValidated] = useState(false);
        const [value, setValue] = useState();        
        const [success, setSuccess] = React.useState(false);

        const onInput = ({target:{value}} ) => setValue(value);

        const handleSubmit = (event) => {
            const form = event.currentTarget;
            event.stopPropagation();

            if (form.checkValidity() === false) {
            event.stopPropagation();
            event.preventDefault();
            }
            setValidated(true);
            console.log(value);
            dispatch(addComment(articleSlug, value));
            setSuccess(true);
        };

        if (success) {
            dispatch(fetchCommentsBySlug(articleSlug));
        }

        const followHandler = (event) => {
            user? (console.log("Followed")): navigate('/login');
        }
        
        const favoriteHandler = (event) => {
            user? dispatch(likeArticle(articleSlug)): navigate('/login');
        }

        const deleteHandler = (event) => {
            dispatch(deleteArticle(articleSlug))
            setTimeout(function () {
                navigate('/');
            }, 1500);
            
        }

        const commentDeleteHandler = (commentID) => {
            const comID=commentID;
            console.log(comID);
            dispatch(deleteComment(articleSlug, comID));
            setTimeout(function () {
                dispatch(fetchCommentsBySlug(articleSlug));
            } , 1000);
        }



    return (
        <>
        <Navbarjelly />

        <div className='article-banner-style'>
                
            <h1>{article?.title}</h1>
            <div>
                 <Link to={`/user/${article?.author.username}`} ><img
                src= {article?.author.image} className='home-page-image-style' alt="profile" /></Link>
                
                <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
                <Link to={`/user/${article?.author.username}`}  className='home-page-link-style'>{article?.author.username}</Link>
                <span style={{    color: '#bbb',
                fontSize: '0.8rem',
                display: 'block'}}>  
                        {article?.createdAt}
                </span>
                </div>

            {article?.author.username === user?.username ? 
            (<span>
                <Link  to={`/editor/${article?.slug}`} className='article-edit-link-style' > {t('edit')}</Link>
                <Button variant="outline-danger" size='sm' onClick={() => { deleteHandler(article.slug)}} style={{marginRight:'1rem'}}> {t('delete')}</Button>
            </span> ):(  
            <span style={{marginLeft:'2rem'}}>
                <button   className='article-buttons' onClick={() => { favoriteHandler(article.favoritesCount)}}> {t('fav')}</button>
                <button className='article-buttons' onClick={() => { followHandler()}}>{t('follow')}</button>
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
            <Link to={`/user/${article?.author.username}`}><img
            src= {article?.author.image} className='home-page-image-style' alt="profile" /></Link>
            
            <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
            <Link to={`/user/${article?.author.username}`} className='home-page-link-style'>{article?.author.username}</Link>
            <span style={{    color: '#bbb',
            fontSize: '0.8rem',
             display: 'block'}}>
                    {article?.createdAt}</span>
            </div>

            {article?.author.username === user?.username ? (<span>
                <Link  to={`/editor/${article?.slug}`} className='article-edit-link-style'> {t('edit')}</Link>
                <Button variant="outline-danger" size='sm' style={{marginRight:'1rem'}} onClick={() => { deleteHandler(article.slug)}}> {t('delete')}</Button>
            </span> ):(  
            <span style={{marginLeft:'2rem'}}>
                <button   className='article-buttons' onClick={() => { favoriteHandler(article.favoritesCount)}}>  {t('fav')}</button>
                <button className='article-buttons' onClick={() => { followHandler()}}> {t('follow')}</button>
            </span>
            )}
        </div>


           
        {success ? (<Alert variant="success" fade='false'>
                 Your comment has been published! </Alert> ): (null)}


           {user ? (
            <>

                <div>
                            
                <Link to={`/user/${article?.author.username}`}><img
                src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" className='home-page-image-style' alt="profile" /></Link>

                <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
                <Link to={`/user/${user?.username}`} className='home-page-link-style'>{user?.username}</Link>
                <span style={{    color: '#bbb',
                fontSize: '0.8rem',
                display: 'block'}}>
                    August 8, 2022</span>
                </div>
                </div>

            <Row>
                <Col>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
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
                   {t('p-comment')}
                </Button>
                </Form>
                
                </Col>

            </Row>
            </>
      
          ):(  <span>
            <p style={{color:'red', textAlign:'center'}}>{t('signup-error')}</p>
        </span>
        )}
        
                
                <div style={{display: 'flex',justifyContent: 'center',}} >

                    <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between', padding: '1rem',}}>

                    {comments?.map(comment => (
                        <div style={{border: '1px solid #e5e5e5'}}key={comment.id}>
                            <div>
                                <Link to='/user'><img
                                src={comment?.author.image}  className='home-page-image-style' alt="profile" /></Link>
                                <div style={{display: 'inline-block', verticalAlign: 'middle',}}>
                                <Link to='/user' className='home-page-link-style'>{comment.author.username}</Link>
                                <span style={{    color: '#bbb',
                                fontSize: '0.8rem',
                                    display: 'block'}}>
                                    {comment.createdAt}</span>
                                </div>

                                {comment.author.username === user?.username ? (<span>
                                <Button variant="outline-danger" size='sm' style={{marginRight:'1rem',marginTop:'1rem',float:'right'}} onClick={() => { commentDeleteHandler(comment.id)}}> {t('delete-c')}</Button>
                            </span> ):(null)}
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