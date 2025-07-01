const apikey = "a0e53c346a97f76ab584c29acdb94c82";
const form = document.querySelector(".search");
const searchInput = document.querySelector(".search-input");
const locationElement = document.querySelector(".location");
const tempElement = document.querySelector(".temperature");
const conditionElement = document.querySelector(".condition");
const iconElement = document.querySelector(".icon");
const timeElement = document.getElementById("time");
const errorElement = document.querySelector(".error");

//Event listener for form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const city = searchInput.value.trim();
  if (city !== "") {
    fetchWeather(city);
  }
});

function fetchWeather(city) {
  console.log(city);
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("city not found");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      locationElement.textContent = `${data.name}, ${data.sys.country}`;
      tempElement.textContent = ` ${Math.round(data.main.temp)}°C`;

      const weatherMain = `${data.weather[0].description}`;
      conditionElement.textContent = weatherMain;

      if (data.weather[0].main == "Clouds") {
        iconElement.src = "images/clouds.png";
      } else if (data.weather[0].main == "Rain") {
        iconElement.src = "images/rain.png";
      } else if (data.weather[0].main == "Clears") {
        iconElement.src = "images/clear.png";
      }
      document.querySelector(".weatherInfo").style.display = "block";

      setInterval(() => {
        const now = new Date();
        timeElement.textContent = now.toLocaleString();
      });
    });
}
