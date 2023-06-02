import Switcher from './Switcher.jsx';
import '../styles/Header.css'

function Header() {
  return (
    <header>
      <div className='head-wrapper'>
        <a href="./index.html">Weather Web</a>
        <Switcher />
      </div>
    </header>
  )
}

export default Header;
