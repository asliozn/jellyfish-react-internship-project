import React,{useState} from "react";
import logo from "./images/jellyfish_logo.png";


const Navbarjelly = () => {
  
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: '#6963AD'
  };
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
            <li> <a href="/editor" style={linkStyle}>New Article</a></li>
            <li>  <a href="/settings" style={linkStyle}>Settings</a></li>
            <li> <a href="/profile" style={linkStyle}>Profile</a></li>
            
          </ul>
         </div>
      </nav>  
      
      </>
    );
}

export default Navbarjelly;
