import PropTypes from "prop-types";
import { Figure } from "./components/Figure/Figure";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const logo = "logo.png";

const App = () => {
  const today = new Date(Date.now()).toISOString().slice(0, 10); //traemos la fecha actual en formato iso, iso es el formato de fecha, toISOString lo simplifica para que siempre mida entre 24 y 27 caracteres
  const [apod, setApod] = useState({}); //
  const [date, setDate] = useState(today);
  const NASA_URL = "https://api.nasa.gov/";
  const NASA_API_KEY = "IEqcgIpZ9lDTKCpRo4bBSMCQOjmaXNOh9fPg6ogZ";

  useEffect(() => {
    const getApod = async () => {
      const data = await axios.get(
        `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`
      );
      setApod(data.data);
    };
    getApod();
  }, [date]);

  const handleInput = (ev) => {
    setDate(ev.target.value.toLocaleString());
  };
  return (
    <div className="App">
      <h2 className="title">
        NASA API <img src={logo} className="logo" alt="NASA LOGO" />
      </h2>
      <h1>Astronomy Picture of the Day</h1>
      <input type="date" id="photo-date" onChange={handleInput} />
      {date > today ? (
        <h2>Please choose a previous date</h2>
      ) : (
        <Figure data={apod} />
      )}
      <div className="standard-dialog center">
        <h1 className="dialog-text">
          Alberto Santamaria - 2023 -{" "}
          <a href="https://api.nasa.gov/">https://api.nasa.gov/</a>
        </h1>
      </div>
    </div>
  );
};

App.propTypes = {
  aboutMe: PropTypes.string,
};

export default App;
