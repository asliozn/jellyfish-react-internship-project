import React,{useState} from "react";
import logo from "./images/jellyfish_logo.png";
import {Link} from "react-router-dom";


const Navbarjelly = () => {
  
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
      <a href="/" style={{marginLeft:'4%'}}>
      <img src={logo} width={100} height={50} alt='Logo' /> </a>
      
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
        
        <li> <a href="/editor" style={linkStyle}>New Article </a></li>
          <li>  <a href="/settings" style={linkStyle}>Settings</a></li>
         <li> <Link to={`/user/${user1?.username}`} style={linkStyle}>{user1?.username}</Link></li>
          <li>
            <a href="/" style={linkStyle}>Home</a>
          </li>

        </ul> ):(
         <ul>
            <li>
              <a href="/" style={linkStyle}>Home</a>
            </li>
            <li>
              <a href="/login" style={linkStyle}>Sign In</a>
            </li>
            <li>
             <a href="/register" style={linkStyle}>Sign Up</a>
            </li>

          </ul>)}
       
         </div>
      </nav>  
      
      </>
    );
}

/*{auth?.accessToken ? (
          <>
         <ul>
        
          <li> <a href="/editor" style={linkStyle}>New Article</a></li>
            <li>  <a href="/settings" style={linkStyle}>Settings</a></li>
            <li> <a href="/user" style={linkStyle}>Profile</a></li>

          </ul>
          </>
         
        
        ) : ( 
          
          <ul>
            <li>
              <a href="/" style={linkStyle}>Home</a>
            </li>
            <li>
              <a href="/login" style={linkStyle}>Sign In</a>
            </li>
            <li>
             <a href="/register" style={linkStyle}>Sign Up</a>
            </li>

          </ul>
       
        )}   */

export default Navbarjelly;
