import React, { Component } from "react";
import Axios from "axios";
import CityCard from "./components/CityCard";
import styled from "styled-components";

// import './App.css';

const App2 = styled.h1`
  margin: 0;
  height: 99vh;
  width: 99vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  background-image: url('https://images.unsplash.com/photo-1484977975800-86a4c7bd7235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3150&q=80');
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  h1 {
    font-family: "Nunito", sans-serif;
    margin: 1rem;;
  }
`;

const Search = styled.div `
  width: 25rem;
  display: flex;
  justify-content: space-around;
  button {
    background: none;
    outline: none;
    border: 1px solid #16c1ff;
    color: #575859;
    font-family: "Nunito", sans-serif;
  }
  button:hover {
    background: #575859;
    border: none;
    color: white;
  }

  buttton:focus{
    outline: none
  }

  input:focus {
    outline: none
  }
  input{
    width: 65%;
    padding-left: 0.25rem;
    font-family: "Nunito", sans-serif;
  }
`

const Allcities = styled.section`
  /* border: 2px solid green; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 70rem;
`

const SearchArea = styled.div`
  /* border: 2px solid red; */
  height: 15rem;
  margin: 0.75rem;
`;

const CurrentSearch = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  padding: 1rem;
  height: 12rem;
  width: 30rem;
  -webkit-box-shadow: 0px 0px 4px 1px #797979; 
  box-shadow: 0px 0px 4px 1px #797979;
  button {
    background: none;
    outline: none;
    border: 1px solid #16c1ff;
    color: #575859;
    font-family: "Nunito", sans-serif;
  }
  button:hover {
    background: #575859;
    border: none;
    color: white;
  }

  buttton:focus{
    outline: none
  }
`;

const SearchText = styled.div`
  h4 {
    font-size: 2rem;
    margin: 0.15rem;
    font-family: "Nunito", sans-serif;
  }

  p {
    font-size: 1rem;
    margin: 0;
    font-weight: 300;
  }font-family: "Nunito", sans-serif;
`;

class App extends Component {
  state = {
    cities: [],
    userInput: "",
    searchWeather: "",
    searchCity: "",
    searchDescription: "",
    searchID: 0,
    gif: ""
  };

  getWeather = async () => {
    const city = this.state.userInput;
    const weatherapi = process.env.REACT_APP_WEATHERKEY
    const response = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${weatherapi}`
    );
    this.setState({
      searchCity: response.data.name,
      searchWeather: Math.floor(response.data.main.temp),
      searchDescription: response.data.weather[0].main,
      searchID: response.data.id
    });
    this.setGif();
  };

  setGif() {
    const { searchWeather } = this.state;
    const temp = searchWeather;
    if (temp <= 20) {
      this.setState({
        gif: "https://media.giphy.com/media/xTcnTehwgRcbgymhTW/giphy.gif"
      });
    } else if (temp > 20 && temp <= 40) {
      this.setState({
        gif: `https://media.giphy.com/media/MofD6FusyLKzktNYPp/giphy.gif`
      });
    } else if (temp > 40 && temp <= 65) {
      this.setState({
        gif: `https://media.giphy.com/media/VzPRJldCDpVio/giphy.gif`
      });
    } else if (temp > 65 && temp <= 75) {
      this.setState({
        gif: `https://media.giphy.com/media/zJNMxcHO7p3Ak/giphy.gif`
      });
    } else if (temp > 75 && temp <= 85) {
      this.setState({
        gif: `https://media.giphy.com/media/94OPiy03NXCiQ/giphy.gif`
      });
    } else if (temp > 85 && temp <= 99) {
      this.setState({
        gif: `https://media.giphy.com/media/l46CzqlTNVbhQrpFC/giphy.gif`
      });
    } else if (temp => 100) {
      this.setState({
        gif: `https://media.giphy.com/media/UZ3XvKxX5ee4g/giphy.gif`
      });
    }
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  addCity(cityObj) {
    this.setState({
      cities: [...this.state.cities, cityObj],
      userInput: ""
    });
  }

  render() {
    const {
      searchCity,
      searchWeather,
      searchDescription,
      cities,
      searchID,
      gif
    } = this.state;
    const weatherCities = cities.map(city => {
      return (
        <div key={city.searchID}>
          <CityCard city={city.searchCity} cityID={city.searchID} />
        </div>
      );
    });

    return (
      <App2>
        <h1> Sam's Really Sweet Weather Site</h1>
        <Search>
          <input
            type="text"
            placeholder="city name"
            value={this.state.userInput}
            onChange={e => this.handleChange("userInput", e.target.value)}
          />
          <button onClick={() => this.getWeather()}> Search Weather </button>
        </Search>
        <SearchArea>
          {searchCity ? (
            <CurrentSearch>
              <SearchText>
                <h4>{searchCity}</h4>
                <p>{searchWeather}°f </p>
                <p>{searchDescription} </p>
                <button onClick={() => this.addCity({ searchCity, searchID })}>
                  add city
                </button>
              </SearchText>
              <img
                src={gif}
                alt=""
                style={{ width: "15rem", height: "10rem" }}
              />
            </CurrentSearch>
          ) : null}
        </SearchArea>

        <Allcities>{weatherCities}</Allcities>
      </App2>
    );
  }
}

export default App;
