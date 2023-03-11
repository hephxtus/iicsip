import React, { useState, useEffect } from "react";

function App() {
  const [isSunny, setIsSunny] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=39.95&longitude=-75.16&hourly=precipitation,weathercode,cloudcover&forecast_days=1"
      );
      const data = await response.json();
      const currentWeatherCode = data.hourly.weathercode[0];
      if (currentWeatherCode >= 0 && currentWeatherCode <= 2) {
        setIsSunny(true);
      } else {
        setIsSunny(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    fetchData();
  };

  return (
    <div>
      {isSunny === true && <h1>YES</h1>}
      {isSunny === false && <h1>NO</h1>}
      {isSunny === null && <h1>Loading...</h1>}
      <button onClick={handleClick}>Refresh</button>
    </div>
  );
}

export default App;
