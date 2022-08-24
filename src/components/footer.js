import React from "react";
import { useTranslation } from "react-i18next";
import Dropdown from 'react-bootstrap/Dropdown';
import LanguageIcon from '@mui/icons-material/Language';




const JellyFooter = () => {

    
  const { i18n } = useTranslation();
  
  function changeLanguage(e) {
    i18n.changeLanguage(e.target.value);
    console.log(e.target.value);
  }

    return (
        <footer style={{position: 'fixed',bottom:'0',right:'0'}}>
        <Dropdown >
                    <Dropdown.Toggle style={{background:'none',border:'none'}} variant="success" id="dropdown-basic">
                    <LanguageIcon  style={{color:'#6963AD'}} />
                    </Dropdown.Toggle>
    
                    <Dropdown.Menu>
                      <Dropdown.Item ><button onClick={changeLanguage} value='en'>English</button></Dropdown.Item>
                      <Dropdown.Item > <button onClick={changeLanguage} value='tr'>Türkçe</button></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
        </footer>
    );
}

export default JellyFooter;

    