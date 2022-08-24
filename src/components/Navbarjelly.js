import React,{useState} from "react";
import logo from "./images/jellyfish_logo.png";
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';



const Navbarjelly = () => {

    const { t } = useTranslation();


  
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: '#6963AD'
  };
  

  const user = localStorage.getItem('user');
  const user1 = user? (JSON.parse(user)) : (null);

    return (
      <>
      <nav className="navigation">
      <Link to="/" style={{marginLeft:'4%'}}>
      <img src={logo} width={100} height={50} alt='Logo' /> </Link>
      
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}
      >
        {/* hamburger svg code...*/} 
        </button>
        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }
        >

    {user ? ( <ul>

            
        <li> <Link to="/editor" style={linkStyle}>{t('new-article')} </Link></li>
          <li>  <Link to="/settings" style={linkStyle}>{t('settings')}</Link></li>
         <li> <Link to={`/user/${user1?.username}`} style={linkStyle}>{user1?.username}</Link></li>
          <li>
            <Link to="/" style={linkStyle}>{t('home')}</Link>
          </li>

        </ul> ):(
         <ul>
            <li>
              <Link to="/" style={linkStyle}>{t('home')}</Link>
            </li>
            <li>
              <Link to="/login" style={linkStyle}>{t('sign-in')}</Link>
            </li>
            <li>
             <Link to="/register" style={linkStyle}>{t('sign-up')}</Link>
            </li>

          </ul>)}
       
         </div>
      </nav>  
      
      </>
    );
}


export default Navbarjelly;
