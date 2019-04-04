import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import styled from "styled-components";
// import './CityCard.css'

const CityCardContainer = styled.div `
  /* border: 2px solid blue; */
  height: 8rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  -webkit-box-shadow: 0px 0px 4px 1px #797979; 
  box-shadow: 0px 0px 4px 1px #797979;
  margin: 1rem;
  animation-name: fade-in;
  animation-duration: 1s;
  background: white;

  h4{
    margin: 0;
    font-size: 1.5rem;
    font-family: "Nunito", sans-serif;
  }
  p {
    font-size: 1rem;
    margin: 0;
    font-weight: 300;
    font-family: "Nunito", sans-serif;
  }


  @keyframes fade-in {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
`


const CityCard = props => {
  const [temp, setTemp] = useState("");
  const [icon, setIcon] = useState("");
  const [iconIMG, setIconIMG] = useState("");

  useEffect(() => {
    getWeather();
  });

  const getWeather = async () => {
    const cityID = props.cityID;
    const weatherapi = process.env.REACT_APP_WEATHERKEY
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=imperial&APPID=${weatherapi}`
    );
    // console.log(response)
    setTemp(Math.floor(response.data.main.temp));
    await setIcon(response.data.weather[0].icon);
    createIconURL();
  };

  const createIconURL = () => {
    const iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    setIconIMG(iconurl);
  };

  return (
    <CityCardContainer>
      <h4>{props.city}</h4>
      <p>{temp}°f </p>
      <img src={iconIMG} alt="" />
    </CityCardContainer>
  );
};

export default memo(CityCard);
