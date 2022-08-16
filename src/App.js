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

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('fetching posts');
    dispatch(fetchPosts());
  } , [dispatch]);

return (
    <>

    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
        <Route path="/editor" element={<Editor />} />
      <Route path="/settings" element={<Settings />} />
       <Route path="/user" element={<ProfilePage/>}>
        <Route path=":@userId" element={<ProfilePage />} />
        </Route>
      <Route path="/article" element={<Article/>}>
        <Route path=":articleSlug" element={<Article />} />
        </Route>
    </Routes>
    </>
    
  );
}

/*<Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
        <Route path="/editor" element={<Editor />} />
      <Route path="/settings" element={<Settings />} />
       <Route path="/user" element={<ProfilePage/>}>
        <Route path=":@userId" element={<ProfilePage />} />
        </Route>
      <Route path="/article" element={<Article/>}>
        <Route path=":articleSlug" element={<Article />} />
        </Route>
    </Routes>*/

export default App;
