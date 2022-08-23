import React,{useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbarjelly from '../components/Navbarjelly';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom'; 
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { likeArticle, unlikeArticle } from "../store/actions/post";
import { useNavigate } from "react-router-dom";
import {fetchPostsByTag} from '../store/actions/post';
import {fetchTags} from '../store/actions/tags';
import {fetchPosts} from '../store/actions/post';

const Home = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    }, []);

    const articleList = useSelector(state => state.post.posts.articles);
    const tagList = useSelector(state => state.tag.tags.tags);

    const articleByTag = useSelector(state => state.post.posts.articles);

    const user = localStorage.getItem('user');
    console.log(user);
    const navigate = useNavigate();
    const [tagPage, setTagPage] = React.useState(false);
    const [tagName, setTagName] = React.useState('');


    const favoriteHandler = (slug) => {
        
        if(user){
                    console.log("like");
                    dispatch(likeArticle(slug));
                    navigate('/');
                
        }
        else{
        navigate('/login');
        }
    }
    const unfavoriteHandler = (slug) => {
        
        if(user){
                    console.log("unlike");
                    dispatch(unlikeArticle(slug));
                    navigate('/');

        
        }
        else{
        navigate('/login');
        }

    }

    const tagHandler = (tag) => {
            dispatch(fetchPostsByTag(tag));
            setTagPage(true);
            setTagName(tag);
            console.log(tag);    
        }

    return (
        <>   
      <Navbarjelly /> 


        <div className="banner-style" >
                        <h1>JellyFish</h1>
                        <h2>A place to share your thoughts</h2>
                        </div>
   

        <Container style={{marginLeft:'10%', marginRight:'5%'}}>

            <Row>
            <Col md={9} sm={12} xs={12}>
                <div>  
                      <ul className="profile-page-list">
 
                         <li style={{float: 'left',    display: 'list-item', }}>
 
                           <a href="/" className= 'profile-page-anchor'>Global Feed </a>
                         </li>
 
                         <li style={{float: 'left',    display: 'list-item', }}>
                         <a href="/" className= 'profile-page-anchor'>{tagName}</a>
                         </li>
 
                     </ul>  

                    {/* <ArticleComp articles={articleByTag} favFunc={favoriteHandler} /> */}


                    {tagPage? (                  
                            <article style={{clear: 'both'}}>
                            { articleByTag?.map(article => (
                                <div key={article.slug} style={{borderTop:' 1px solid rgba(0,0,0,0.1)',padding:'5px'}}>

                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                <div>
                                <Link to={`/user/${article.author.username}`} >
                                <img src= {article.author.image} className='home-page-image-style' alt="profile" /></Link>

                                
                                <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
                                <Link to={`/user/${article.author.username}`} className='home-page-link-style' >
                                {article.author.username}</Link>

                                <span style={{    color: '#bbb',
                                fontSize: '0.8rem',
                                display: 'block'}}>
                                        {article.createdAt}</span>
                                </div>
                                </div>

                                <button style={{float:'right',color:'#AA86D5',borderColor:'#AA86D5'}} onClick={() => { favoriteHandler(article.slug)}} >
                                <FavoriteIcon sx={{ color:'#AA86D5' }} /> {article.favoritesCount}</button>
                                </div>
                                


                                <h5>{article.title}</h5>
                                <p style={{color:'grey'}}>{article.description}</p>

                                <Link to={`/article/${article.slug}`} style={{color:'#6963AD', float:'left', textDecoration:'none'}} >Read More</Link>

                                <div style={{display:'flex', justifyContent:'right'}}>  
                                {article.tagList.map(tag => ( <a href='/' key={tag.id} className='home-page-tag-style'>{tag}</a>
                                ))}
                                </div>

                                </div>
                            ))}   
                            </article>

                    ):(

                            //global feed
                            <article style={{clear: 'both'}}>

                            { articleList?.map(article => (
                                <div key={article.slug} style={{borderTop:' 1px solid rgba(0,0,0,0.1)',padding:'5px'}}>

                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                <div>
                                <Link to={`/user/${article.author.username}`} >
                                <img src= {article.author.image} className='home-page-image-style' alt="profile" /></Link>

                                
                                <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
                                <Link to={`/user/${article.author.username}`} className='home-page-link-style' >
                                {article.author.username}</Link>

                                <span style={{    color: '#bbb',
                                fontSize: '0.8rem',
                                display: 'block'}}>
                                        {article.createdAt}</span>
                                </div>
                                </div>


                                <div style={{display:'flex', justifyContent:'right'}}>
                                <button style={{color:'#AA86D5',borderColor:'#AA86D5'}} onClick={() => { favoriteHandler(article.slug)}} >
                                <FavoriteIcon sx={{ color:'#AA86D5',  display: 'inline-block' }} /> {article.favoritesCount}</button>

                                
                                <button style={{marginLeft:'2%',color:'#AA86D5',borderColor:'#AA86D5'}} onClick={() => { unfavoriteHandler(article.slug)}} >
                                <HeartBrokenIcon sx={{ color:'#AA86D5',float:'left' }} /> Dislike</button>
                                </div>


                                </div>

                                <h5>{article.title}</h5>
                                <p style={{color:'grey'}}>{article.description}</p>

                                <Link to={`/article/${article.slug}`} style={{color:'#6963AD', float:'left', textDecoration:'none'}} >Read More</Link>

                                <div style={{display:'flex', justifyContent:'right'}}>  
                                {article.tagList.map(tag => ( <a href='/' key={tag.id} className='home-page-tag-style'>{tag}</a>
                                ))}
                                </div>
                            
                                </div>
                            ))}   
                            </article>)}
                </div>
            </Col>
            
            <Col md={3} sm={12} xs={12} >
                <div style={{backgroundColor:'#F1EAF6',width:'100%',textAlign:'center',paddingBottom:'15px',
                color: '#6963AD', marginTop:'5%'}}>
                    <h6>Popular Tags</h6>

                   {tagList?.map(tags => (  
                        <button key={tags.id} className='forHoverTag' onClick={() => { tagHandler(tags)}}>{tags}</button>
                    ))}   

                </div>
            </Col>
            </Row>
            <br/>
            <br/>
            
            
        </Container>



        </>
    );
    }

export default Home;
