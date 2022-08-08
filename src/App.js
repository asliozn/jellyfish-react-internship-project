import './App.css';
import {React} from 'react';
import Navbarjelly from './components/Navbarjelly';
import {Routes, Route, Link,Router} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Editor from './components/Editor';
import Settings from './components/Settings';
import ProfilePage from './components/ProfilePage';
import Article from './components/Article';


function App() {
  return (
    <>
    
     <Navbarjelly/>

    <Routes> 
      
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/article" element={<Article />} />

    </Routes>
    </>
  );
}

export default App;
