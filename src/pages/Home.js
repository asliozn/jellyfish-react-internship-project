import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import Navbarjelly from '../components/Navbarjelly';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {fetchPosts} from '../store/actions/post';
import {fetchTags} from '../store/actions/tags';
import {Link} from 'react-router-dom'; 



const tagStyle ={
    textDecoration:'none',
    float:'right',
    color:'white',
   borderColor:'white',
    backgroundColor: '#AA86D5',
    textAlign: 'center',
    borderRadius: '10px',
    fontSize: '13px',
    padding: '5px',

}
const Home = () => {


    const articleList = useSelector(state => state.post.posts.articles);
    console.log(articleList);
    const tagList = useSelector(state => state.tag.tags.tags);
    console.log(tagList);
    return (
        <>   
        <Navbarjelly />


        <div className="banner-style" >
                        <h1>JellyFish</h1>
                        <h2>A place to share your thoughts</h2>
                        </div>
   

        <Container style={{marginLeft:'10%', marginRight:'5%'}}>

            <Row>
            <Col sm={9} xs={12}>
                <div>                    
                    <h5><a href="/" style={{ textDecoration: "none",color: '#6963AD'}} className='profile-page-anchor'>Global Feed </a></h5>

                    <article >
                        { articleList?.map(article => (
                            <div key={article.slug} style={{borderTop:' 1px solid rgba(0,0,0,0.1)',padding:'5px'}}>
                            <h5>{article.title}</h5>
                            <p style={{color:'grey'}}>{article.description}</p>


                            <div style={{display:'flex', justifyContent:'space-between'}}>  
                            <Link to={`/article/${article.slug}`} style={{color:'#6963AD', float:'left', textDecoration:'none'}} >Read More</Link>
                           
                            <a href='/' style={tagStyle}>{article.tagList}</a> 
                            </div>
                         
                             </div>
                    ))}   
                    </article>
                </div>
            </Col>
            
            <Col sm={3} xs={12} >
                <div style={{backgroundColor:'#F1EAF6',width:'100%',textAlign:'center',paddingBottom:'15px',
                color: '#6963AD', marginTop:'5%'}}>
                    <h6>Popular Tags</h6>

                   {tagList?.map(tags => (  
                        <button key={tags.id} className='forHoverTag'>{tags}</button>
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
