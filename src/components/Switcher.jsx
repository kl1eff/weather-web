import '../styles/Switcher.css'


function Switcher() {
  return (
    <div className='switcher'>
      <div>
        <input type="checkbox" id="switch"/>
        <label htmlFor="switch"></label>
      </div>
      <span>dark theme</span>
    </div>
  )  
}

export default Switcher;


