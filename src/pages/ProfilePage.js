/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbarjelly from "../components/Navbarjelly";
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser} from "../store/actions/user";
import {getProfile} from "../store/actions/profile";
import { getArticlesByAuthor } from "../store/actions/post";
import {Link} from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {followUser,unfollowUser} from "../store/actions/profile";
import { getArticlesByFavorited } from "../store/actions/post";
import { useTranslation } from "react-i18next";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const ProfilePage = () => {
        

        let { userID } = useParams();

        const { t } = useTranslation();

        const [favPage, setFavPage] = React.useState(false);
        const [show, setShow] = React.useState(false);

        const navigate = useNavigate();

        const user1 = JSON.parse(localStorage.getItem('user'));


       
        const dispatch = useDispatch();
        
        useEffect(() => {

               user1? (dispatch(getCurrentUser(user1))): (console.log("no user"));
                dispatch(getProfile(userID));

                userID === user1?.username ? (
                dispatch(getArticlesByAuthor(user1.username))
                ) : (
                dispatch(getArticlesByAuthor(userID))
                )

            } , []); 
            
            const favPageHandler = (username) => {

                dispatch(getArticlesByFavorited(username));
                setFavPage(true);
                console.log("i did it")
        }

        const closeFavPage = () => {
            dispatch(getArticlesByAuthor(user1.username))
            setFavPage(false);
        }

            const favoritedArticles = useSelector(state => state.post.posts.articles);
         
            const user = useSelector(state => state.user.user.user);
            const profile = useSelector(state => state.profile.profile.profile);
            const articles = useSelector(state =>  state.post.posts.articles);

            const followHandler = (profileUsername) => {
                    if(user1) {
                        dispatch(followUser(profileUsername)) 
                        setShow(true);
                    }
                    else{navigate("/login");}
                        console.log(profileUsername);
            }
            const unfollowHandler = (profileUsername) => {
                user1? (dispatch(unfollowUser(profileUsername))): (navigate("/login"));
            }
      
            
    return (
    
    <>
    <Navbarjelly />


        {user1? (

        userID === user1.username ? (
            <>
             <div className="user-container" style={{color: '#6963AD',marginBottom: '2%'}}>
             <div className="row">
                 <div className="col-md-12">
                 <img src='https://ps.w.org/metronet-profile-picture/assets/icon-256x256.png?rev=2464419' className='profile-page-image-style' alt="profile picture" />
                     <h4>{user?.username}</h4>
                     <p>{user?.bio}</p>
 
 
                 <Link to="/settings" className='profile-page-link-style'> {t('settings')}</Link>
                
             </div>
         </div>
         </div>      

         <Container style={{marginLeft:'10%', marginRight:'5%'}}>
             <Row>
             <Col md={9} xs={12}>

                 <div>    
                     <ul className="profile-page-list">
 
                         <li style={{float: 'left',   display: 'list-item' }}>
 
                           <button className='profile-p-button' onClick={() => { closeFavPage()}}>{t('m-articles')} </button>
                         </li>
 
                         <li style={{float: 'left',    display: 'list-item', }}>
                         <button className='profile-p-button'  onClick={() => { favPageHandler(user1?.username)}} >{t('f-articles')}</button>
                         </li>
 
                     </ul>

                        {favPage ? (<article style={{borderTop:' 1px solid rgba(0,0,0,0.1)',clear: 'both'}}>

                                {   favoritedArticles?.map(article => (
                                    <div key={article.slug} style={{borderTop:' 1px solid rgba(0,0,0,0.1)',padding:'5px'}}>

                                    <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <div>
                                    <Link to={`/user/${article.author.username}`} >
                                    <img src= {article.author.image} className='home-page-image-style' alt="profile" /></Link>

                                    
                                    <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
                                    <Link to='/user' className='home-page-link-style'>{article.author.username}</Link>
                                    <span style={{    color: '#bbb',
                                    fontSize: '0.8rem',
                                    display: 'block'}}>
                                            {article.createdAt}</span>
                                    </div>
                                    </div>

                                    <Button style={{float:'right',color:'#AA86D5',borderColor:'#AA86D5'}}   variant='outline-secondary' size='sm' >
                                    <FavoriteIcon sx={{ color:'#AA86D5' }} /> {article.favoritesCount}</Button>
                                    </div>
                                    


                                    <h5>{article.title}</h5>
                                    <p style={{color:'grey'}}>{article.description}</p>


                                    <div style={{display:'flex', justifyContent:'space-between'}}>  
                                    <Link to={`/article/${article.slug}`} style={{color:'#6963AD', float:'left', textDecoration:'none'}} >{t('r-more')}</Link>

                                    <div style={{display:'flex', justifyContent:'right'}}>  
                                    {article.tagList.map(tag => ( <Link to='/' key={tag.id} className='home-page-tag-style'>{tag}</Link>
                                    ))}
                                    </div>                                            
                                    </div>

                                    </div>
                                ))}   
                                </article>

                  ) : (
                    <article style={{borderTop:' 1px solid rgba(0,0,0,0.1)',clear: 'both'}}>

                    {   articles?.map(article => (
                        <div key={article.slug} style={{borderTop:' 1px solid rgba(0,0,0,0.1)',padding:'5px'}}>

                        <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div>
                        <Link to={`/user/${article.author.username}`} >
                        <img src= {article.author.image} className='home-page-image-style' alt="profile" /></Link>

                        
                        <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
                        <Link to='/user' className='home-page-link-style'>{article.author.username}</Link>
                        <span style={{    color: '#bbb',
                        fontSize: '0.8rem',
                        display: 'block'}}>
                                {article.createdAt}</span>
                        </div>
                        </div>

                        <Button style={{float:'right',color:'#AA86D5',borderColor:'#AA86D5'}}   variant='outline-secondary' size='sm' >
                        <FavoriteIcon sx={{ color:'#AA86D5' }} /> {article.favoritesCount}</Button>
                        </div>
                        


                        <h5>{article.title}</h5>
                        <p style={{color:'grey'}}>{article.description}</p>


                        <div style={{display:'flex', justifyContent:'space-between'}}>  
                        <Link to={`/article/${article.slug}`} style={{color:'#6963AD', float:'left', textDecoration:'none'}} >{t('r-more')}</Link>

                        <div style={{display:'flex', justifyContent:'right'}}>  
                        {article.tagList.map(tag => ( <Link to='/' key={tag.id} className='home-page-tag-style'>{tag}</Link>
                        ))}
                        </div>                                            
                        </div>

                        </div>
                    ))}   
                    </article>
                                
                                )}

                 </div>
             </Col>
         </Row>
         </Container>
            </>
            ) : (
                <>
               <div className="user-container" style={{color: '#6963AD',marginBottom: '2%'}}>
                        <div className="row">
                            <div className="col-md-12">
                            <img src={profile?.image} className='profile-page-image-style' alt="profile picture" />
                                <h4>{profile?.username}</h4>
                                <p>{profile?.bio}</p>  


                                <Collapse in={show}>
                                    <Alert style={{width:'30%',marginBottom:'1%',float:"right"}} 
                                    action={
                                        <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setShow(false);
                                        }}
                                        >
                                        <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    variant="outlined" severity="success"
                                    >
                                        Followed!        
                                        </Alert>
                                </Collapse>



                          
                            <Button size="sm"style={{color:"#AA86D5", borderColor:"#AA86D5",float:"right",marginLeft:'1rem',marginRight:'1rem'}}  variant="outlined"  onClick={() => { followHandler(profile?.username)}}>{t('follow')}</Button>
                           <Button size="sm" style={{color:"#AA86D5", borderColor:"#AA86D5",float:"right"}}  variant="outlined" onClick={() => { unfollowHandler(profile?.username)}}>{t('unfollow')} </Button>
                         
                           
                        </div>
                    </div>
                </div>
                <Container style={{marginLeft:'10%', marginRight:'5%'}}>
                    <Row>
                    <Col sm={9} xs={12}>

                        <div>
                            <ul className="profile-page-list">
                                <li style={{float: 'left',    display: 'list-item', }}>
                                    <Link to="/" className= 'profile-page-anchor'>{t('g-feed')}</Link>
                                </li>
                            </ul>
                            <article style={{borderTop:' 1px solid rgba(0,0,0,0.1)',clear: 'both'}}>

                                        {   articles?.map(article => (
                                            <div key={article.slug} style={{borderTop:' 1px solid rgba(0,0,0,0.1)',padding:'5px'}}>

                                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                            <div>
                                            <Link to={`/user/${article.author.username}`} >
                                            <img src= {article.author.image} className='home-page-image-style' alt="profile" /></Link>

                                            
                                            <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
                                            <Link to='/user' className='home-page-link-style'>{article.author.username}</Link>
                                            <span style={{    color: '#bbb',
                                            fontSize: '0.8rem',
                                            display: 'block'}}>
                                                    {article.createdAt}</span>
                                            </div>
                                            </div>

                                            <Button style={{float:'right',color:'#AA86D5',borderColor:'#AA86D5'}}   variant='outline-secondary' size='sm' >
                                            <FavoriteIcon sx={{ color:'#AA86D5' }} /> {article.favoritesCount}</Button>
                                            </div>
                                            


                                            <h5>{article.title}</h5>
                                            <p style={{color:'grey'}}>{article.description}</p>


                                            <div style={{display:'flex', justifyContent:'space-between'}}>  
                                            <Link to={`/article/${article.slug}`} style={{color:'#6963AD', float:'left', textDecoration:'none'}} >{t('r-more')}</Link>
                                        
                                            <div style={{display:'flex', justifyContent:'right'}}>  
                                            {article.tagList.map(tag => ( <Link to='/' key={tag.id} className='home-page-tag-style'>{tag}</Link>
                                            ))}
                                            </div>                                            
                                            </div>
                                        
                                            </div>
                                        ))}   
                            </article>
                        </div>
                    </Col>
                </Row>
                </Container>
                </> )
            ) : (

            <>
            <div className="user-container" style={{color: '#6963AD',marginBottom: '2%'}}>
                        <div className="row">
                            <div className="col-md-12">
                            <img src={profile?.image} className='profile-page-image-style' alt="profile picture" />
                                <h4>{profile?.username}</h4>
                                <p>{profile?.bio}</p> 
                            
                            <Collapse in={show}>
                                <Alert
                                action={
                                    <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setShow(false);
                                    }}
                                    >
                                    <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                variant="outlined"
                                >
                                    Followed!        
                                    </Alert>
                            </Collapse>
                    
                            <Button size="sm"style={{color:"#AA86D5", borderColor:"#AA86D5",float:"right",marginLeft:'1rem',marginRight:'1rem'}}  variant="outlined"  onClick={() => { followHandler(profile?.username)}}>{t('follow')}</Button>
                           <Button size="sm" style={{color:"#AA86D5", borderColor:"#AA86D5",float:"right"}}  variant="outlined" onClick={() => { unfollowHandler(profile?.username)}}>{t('unfollow')} </Button>
                         
                            
                        </div>
                    </div>
                </div>      
            
            <div style={{textAlign:'center'}}>
            <p style={{color:'red'}}>{t('login-error')}</p>
            <Link to="/login" className= 'profile-page-anchor'>{t('l-page')}</Link>
            </div>
            </>
        )}

    </>
    );
}
export default ProfilePage;