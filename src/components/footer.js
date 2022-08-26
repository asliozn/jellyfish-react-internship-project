import React from "react";
import { useTranslation } from "react-i18next";
import Dropdown from 'react-bootstrap/Dropdown';
import LanguageIcon from '@mui/icons-material/Language';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';




const JellyFooter = () => {

    
  const { i18n } = useTranslation();
  
  function changeLanguage(e) {
    i18n.changeLanguage(e.target.value);
    console.log(e.target.value);
  }

  function changeTheme(e) {
    console.log(e.target.value);
      localStorage.setItem('theme', e.target.value)
      document.documentElement.className = e.target.value;
  }

    return (
        <footer className="footer-style">
        <Dropdown >
                    <Dropdown.Toggle style={{background:'none',border:'none'}} variant="success" id="dropdown-basic">
                    <LanguageIcon  style={{color:'#6963AD'}} />
                    </Dropdown.Toggle>
    
                    <Dropdown.Menu>
                      <Dropdown.Item ><button onClick={changeLanguage} value='en' className="footer-button">English</button></Dropdown.Item>
                      <Dropdown.Item > <button onClick={changeLanguage} value='tr' className="footer-button">Türkçe</button></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown >
                    <Dropdown.Toggle style={{background:'none',border:'none'}} variant="success" id="dropdown-basic">
                    <PaletteOutlinedIcon  style={{color:'#6963AD'}} />
                    </Dropdown.Toggle>
    
                    <Dropdown.Menu>
                      <Dropdown.Item ><button onClick={changeTheme} value='theme-dark' className="footer-button"> Dark <DarkModeIcon  style={{color:'#6963AD'}} /></button></Dropdown.Item>
                      <Dropdown.Item > <button onClick={changeTheme} value='theme-light' className="footer-button"> Light <LightModeOutlinedIcon  style={{color:'#6963AD'}} /></button></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
        </footer>
    );
}

export default JellyFooter;

    