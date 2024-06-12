const input_location = document.querySelector(".no-submit");
const search_button = document.querySelector(".search-btn");
const City = document.querySelector(".city-info");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const wind_speed = document.querySelector(".wind-speed");
const visibility = document.querySelector(".visibility");
const description_weather = document.querySelector(".description");

function getWeatherIcon(descp) {
  const mapping = {
    clear: "wb_sunny",
    clouds: "wb_cloudy",
    rain: "umbrella",
    thunderstorm: "flash_on",
    drizzle: "grain",
    snow: "ac_unit",
    mist: "cloud",
    smoke: "cloud",
    haze: "cloud",
    fog: "cloud",
  };

  return mapping[descp] || "error";
}

function getIconColor(descp) {
  const mapping = {
    clear: "rgb(84, 154, 239)",
    clouds: "black",
    rain: "rgb(45, 125, 222)",
    thunderstorm: "orange",
    drizzle: "rgb(45, 125, 222)",
    snow: "white",
    mist: "black",
    smoke: "rgb(59, 59, 59)",
    haze: "rgb(59, 59, 59)",
    fog: "rgb(59, 59, 59)",
  };

  return mapping[descp] || "black";
}

async function checkWeather(city) {
  const api_key = "9ba90c23999ac16841aabeff78ccbc7c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      City.innerHTML = `<h2>${response.name}</h2>`;
      temperature.innerHTML = `<h2>${Math.round(
        response.main.temp
      )}<sup>°</sup>C</h2>
            <p>(${Math.round(response.main.feels_like)}<sup>°</sup>C)</p>`;

      humidity.innerHTML = `<i class="material-icons" style="font-size: 27px">water_drop</i>
          <span class="other-info-values">${Math.round(
            response.main.humidity
          )} %</span>`;
      wind_speed.innerHTML = `<i class="material-icons" style="font-size: 27px">air</i>
          <span class="other-info-values">${Math.round(
            response.wind.speed
          )} Km/Hr</span>`;
      visibility.innerHTML = ` <i class="material-icons" style="font-size: 27px">visibility</i>
          <span class="other-info-values">${Math.round(
            response.visibility / 1000
          )} Km</span>`;

      const weather_icon = getWeatherIcon(response.weather[0].description);
      const icon_color = getIconColor(response.weather[0].description);

      description_weather.innerHTML = `<i class="material-icons" id="desc-icon" style="color: ${icon_color}">${weather_icon}</i>
          <span id="desc">${response.weather[0].description}</span>`;
    })
    .catch((err) => {
      console.error(err);
    });
}

search_button.addEventListener("click", () => {
  checkWeather(input_location.value);
  input_location.value = "";
});
