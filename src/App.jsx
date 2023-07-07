import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import ReactSwitch from "react-switch";
import { useDispatch, useSelector } from "react-redux";
import {
  weatherDataAsync,
  setTempType,
  setSearchQuery,
} from "./store/weatherReducer";
function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.weatherSlice);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (val) => {
    dispatch(setTempType(!state.shownFarenhietTemp));
    state.searchQuery != "" && dispatch(weatherDataAsync());
  };

  return (
    <div className="App">
      <form className="input-wrapper">
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="Enter location"
        />
        <div className="toggle-switch">
          <p>°F</p>
          <ReactSwitch
            checked={state.shownFarenhietTemp}
            onChange={handleChange}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
          <p>°C</p>
        </div>
        <button
          className="search-button"
          onClick={(event) => {
            event.preventDefault();
            if (inputValue != "") {
              dispatch(setSearchQuery(inputValue));
              dispatch(weatherDataAsync());
            } else {
              alert("field is empty");
            }
          }}
        >
          Search
        </button>
      </form>
      <div>
        {state.showError && state.searchQuery != "" && "Something went wrong."}
        {state.showLoader && state.searchQuery != "" && "Loading...."}
      </div>
      <div className="weather-data-wrapper">
        {!state.showError &&
          state?.weatherInfo?.map((item, index) => {
            return (
              <div className="weather-item" key={index}>
                <img
                  src={`http://openweathermap.org/img/w/${item?.weather[0]?.icon}.png`}
                  alt=""
                />
                <div>Temperature</div>
                <div className="temp">
                  {item?.main?.temp} {state.shownFarenhietTemp ? "°C" : "°F"}
                </div>
                <div>Humidity</div>
                <div className="humidity">{item?.main?.humidity}</div>
                <div>{item?.weather[0]?.description}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
