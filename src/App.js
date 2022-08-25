import './App.css';
import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Editor from './pages/Editor';
import Settings from './pages/Settings';
import ProfilePage from './pages/ProfilePage';
import Article from './pages/Article';
import {useDispatch} from 'react-redux';
import {fetchPosts} from './store/actions/post';
import {fetchTags} from './store/actions/tags';
import JellyFooter from './components/footer';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(fetchPosts());
  dispatch(fetchTags());
  }, []);

  const themeHandler = () => {
    const theme = localStorage.getItem('theme');
    if(theme === 'theme-dark'){
      document.documentElement.className = 'theme-dark';
    }else{
      document.documentElement.className = 'theme-light';
    }
  }

  themeHandler();

  
return (
    < div className='app-style'>
            <Routes> 
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/editor" element={<Editor />}>
                <Route path="/editor/:articleSlug" element={<Editor />} />
              </Route>

              <Route path="/settings" element={<Settings />} />
              <Route path="/user/:userID" element={<ProfilePage />} />
              <Route path="/article/:articleSlug" element={<Article />} />

            </Routes>
          
          <JellyFooter />
     </div>
    
  );
}

export default App;
