import { useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai'

import '../styles/MainSection.css';



function MainSection() {
  const weatherKeyAPI = 'ddb3c04efbbc46ad9d6201356230905';
  const weatherUrlBefore = 'https://api.weatherapi.com/v1/current.json?key=';
  const weatherUrlAfter = '&q=';
  
  
  const photoKeyAPI = 't3SaVs2Cti4_1ZdeRR6zgPirK5P97fLWcUXd3gRYa1s';
  const photoUrlBefore = 'https://api.unsplash.com/search/photos?tags=urban&query=location['
  const photoUrlAfter = ']&per_page=1&client_id='

  const [city, setCity] = useState('london');
  const [weatherData, setWeatherData] = useState(null);
  const [photoData, setPhotoData] = useState(null);



  const getInfo = async (city) => {
    const weatherURL = buildURL(weatherUrlBefore, weatherKeyAPI, weatherUrlAfter, city);
    const unsplashURL = buildURL(photoUrlBefore, city, photoUrlAfter, photoKeyAPI);


    const weatherResponse = await fetch(weatherURL);
    const weatherJSON = await weatherResponse.json();

    const unsplashResponse = await fetch(unsplashURL);
    const unsplashJSON = await unsplashResponse.json();
    

    setWeatherData(weatherJSON);
    setPhotoData(unsplashJSON);
  }

  const buildURL = () => arguments.reduce((sum, current) => sum + current);



  return (
    <main>
      <div className="main-content">
        <div className="city-photo"></div>
        <div className="info">
          <div className="search">
            <AiOutlineSearch color="white" size={50}/>
            <input type="text" placeholder="Search city"/>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainSection;