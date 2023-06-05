import { useState } from 'react';
import '../styles/Switcher.css'


function Switcher() {
  const [theme, setTheme] = useState(false);

  const changeHandle = (e) => {
    setTheme(e.target.checked);
    const body = document.querySelector('body');

    theme ? body.removeAttribute('data-light-mode') : body.toggleAttribute('data-light-mode');
  }


  return (
    <div className='switcher'>
      <div>
        <input type="checkbox" id="switch" onChange={changeHandle}/>
        <label htmlFor="switch"></label>
      </div>
      <span>dark theme</span>
    </div>
  )  
}

export default Switcher;