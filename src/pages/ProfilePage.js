/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbarjelly from "../components/Navbarjelly";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser} from "../store/actions/user";
import {getProfile} from "../store/actions/profile";
import { getArticlesByAuthor } from "../store/actions/post";
import {Link} from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {followUser,unfollowUser} from "../store/actions/profile";
import { getArticlesByFavorited } from "../store/actions/post";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
        

        let { userID } = useParams();

        const { t } = useTranslation();

        const [favPage, setFavPage] = React.useState(false);


        const user1 = JSON.parse(localStorage.getItem('user'));
        const userArticles1 = JSON.parse(localStorage.getItem("articles"));


       

        const dispatch = useDispatch();
        
        useEffect(() => {
                //dispatch(getCurrentUser(user1));
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
            setFavPage(false);
        }

            const favoritedArticles = useSelector(state => state.post.posts.articles);
         
            //const user = useSelector(state => state.user.user.user);
            const profile = useSelector(state => state.profile.profile.profile);
            const articles = useSelector(state =>  state.post.posts.articles);

            const followHandler = (profileUsername) => {
               user1? (dispatch(followUser(profileUsername))): (alert('Please login to follow this user'));
                console.log(profileUsername);
            }
            const unfollowHandler = (profileUsername) => {
                user1? (dispatch(unfollowUser(profileUsername))): (alert('Please login to unfollow this user'));
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
                     <h4>{user1?.username}</h4>
                     <p>{user1?.bio}</p>
 
 
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

                                { userArticles1?.map(article => (
                                    <div key={JSON.parse(article).article.slug} style={{borderTop:' 1px solid rgba(0,0,0,0.1)',padding:'5px'}}>

                                    <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <div>
                                    <Link to={`/user/${JSON.parse(article).article.author.username}`} >
                                    <img src= {JSON.parse(article).article.author.image} className='home-page-image-style' alt="profile" /></Link>

                                    
                                    <div style={{display: 'inline-block', verticalAlign: 'middle',}}>   
                                    <Link to='/user' className='home-page-link-style'>{JSON.parse(article).article.author.username}</Link>
                                    <span style={{    color: '#bbb',
                                    fontSize: '0.8rem',
                                    display: 'block'}}>
                                            {JSON.parse(article).article.createdAt}</span>
                                    </div>
                                    </div>

                                    <Button style={{float:'right',color:'#AA86D5',borderColor:'#AA86D5'}}   variant='outline-secondary' size='sm' >
                                    <FavoriteIcon sx={{ color:'#AA86D5' }} /> {JSON.parse(article).article.favoritesCount}</Button>
                                    </div>
                                    


                                    <h5>{JSON.parse(article).article.title}</h5>
                                    <p style={{color:'grey'}}>{JSON.parse(article).article.description}</p>


                                    <div style={{display:'flex', justifyContent:'space-between'}}>  
                                    <Link to={`/article/${JSON.parse(article).article.slug}`} style={{color:'#6963AD', float:'left', textDecoration:'none'}} >{t('r-more')}</Link>

                                    <div style={{display:'flex', justifyContent:'right'}}>  
                                    {JSON.parse(article).article.tagList.map(tag => ( <Link to='/' key={tag.id} className='home-page-tag-style'>{tag}</Link>
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
                           <Button size="sm" style={{backgroundColor:'#6963AD', borderColor:'#6963AD', float:'right'}} onClick={() => { followHandler(profile?.username)}}>{t('follow')}</Button>
                           <Button size="sm" style={{backgroundColor:'#6963AD', borderColor:'#6963AD', float:'right'}} onClick={() => { unfollowHandler(profile?.username)}}>{t('unfollow')} </Button>

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
                          <Button size="sm" style={{backgroundColor:'#6963AD', borderColor:'#6963AD', float:'right'}}onClick={() => { followHandler(profile?.username)}}>{t('follow')} </Button>
                          <Button size="sm" style={{backgroundColor:'#6963AD', borderColor:'#6963AD', float:'right'}} onClick={() => { unfollowHandler(profile?.username)}}>{t('unfollow')} </Button>

                        </div>
                    </div>
                </div>      
            
            <p>{t('login-error')}</p>
            <Link to="/login" className= 'profile-page-anchor'>{t('sign-in')}</Link>
            </>


                )}

    </>
    );
}
export default ProfilePage;