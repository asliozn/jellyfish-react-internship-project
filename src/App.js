import './App.css';
import React,{useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Editor from './components/Editor';
import Settings from './components/Settings';
import ProfilePage from './components/ProfilePage';
import Article from './components/Article';
import Navbarjelly from './components/Navbarjelly';
import {AuthContext,auth} from './AuthContext';

function App() {


  return (
    <>

    <AuthContext.Provider value={auth}>
    <Navbarjelly />
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
    </AuthContext.Provider>
    </>
    
  );
}

export default App;
