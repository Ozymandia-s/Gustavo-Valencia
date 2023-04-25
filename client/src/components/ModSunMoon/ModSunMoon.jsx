import "./ModSunMoon.styles.css"

import { useState } from "react";

function ModoClaroOscuro() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  function toggleTheme() {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
    
  }

  return (
    <div className="switch-theme">
      <button className={isDarkMode ? 'dark-mode': ''}onClick={toggleTheme}>
      {isDarkMode ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
        
      
      </button>
      
    </div>
  );
}
  export default ModoClaroOscuro;