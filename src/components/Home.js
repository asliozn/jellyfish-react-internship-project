import React,{useEffect,useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import useAuth from "../hooks/useAuth";
import Navbarjelly from './Navbarjelly';

const bannerStyle = {
    backgroundColor: '#AA86D5',
    backgroundPosition: 'center',
    height: '30vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    boxShadow: 'inset 0 8px 8px -8px rgb(0 0 0 / 30%),inset 0 -8px 8px -8px rgb(0 0 0 / 30%)',
    color: 'white',
    textShadow: '2px 2px rgb(0 0 0 / 30%)',
    marginBottom: '4%'
}

const tagStyle ={
    backgroundColor: '#AA86D5',
    textAlign: 'center',
    borderRadius: '10px',
    margin: '5px',
    padding: '5px',
    color: 'white',
    fontSize: '13px',
}
const Home = () => {
   
    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
   }

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tags, setTags] = useState([]);
   

    const fetchArticles = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('https://api.realworld.io/api/articles?limit=20&offset=0');
            const data = await res.json();
            setArticles(data.articles);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const fetchTags = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('https://api.realworld.io/api/tags');
            const data = await res.json();
            setTags(data.tags);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchArticles();
        fetchTags();
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


        <div className="banner" style={bannerStyle}>
                        <h1>JellyFish</h1>
                        <h2>A place to share your thoughts</h2>
                        </div>
   

        <Container style={{marginLeft:'10%', marginRight:'5%'}}>

            <Row>
            <Col sm={9} xs={12}>
                <div>                    
                    <h5><a href="/" style={{ textDecoration: "none",color: '#6963AD'}}>Global Feed </a></h5>

                    <article >
                        {articles.map(article => (
                            <div key={article.slug} style={{borderTop:' 1px solid rgba(0,0,0,0.1)'}}>
                            <h5>{article.title}</h5>
                            <p style={{color:'grey'}}>{article.description}</p>
                            <a href='/' style={tagStyle}>{article.tagList}</a> 
                            <a href='/article' style={{color:'#6963AD', float:'right'}} >{article.slug}</a>
                            </div>
                    ))}
                    </article>
                </div>
            </Col>
            <Col sm={3} xs={12} >
                <div style={{backgroundColor:'#F1EAF6',width:'100%',textAlign:'center',paddingBottom:'15px',
                color: '#6963AD',borderRadius: '15px'}}>
                    <h6>Popular Tags</h6>

                    {tags.map(tag => (  
                        <button key={tag.id} style={tagStyle}>{tag}</button>
                    ))}

                </div>
            </Col>
            </Row>
            <br/>
            <br/>
            
            <div style={{   display: 'flex',justifyContent: 'center'}}>
                        <br/>
                        <Pagination size="md">{items}</Pagination>
                    </div>
        </Container>



        </>
    );
    }

export default Home;
