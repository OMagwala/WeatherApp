const apiKEY = "5db59e18866207640164cfa94c221f9f";
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

//Selecting DOM elements 
const townName = document.querySelector("#townName");
const temperature = document.querySelector("#tempDeg");
const condition = document.querySelector("#condition");
const clouds = document.querySelector("#cover");
const winds = document.querySelector("#speed");
const humidity = document.querySelector("#humi");
const searchField = document.querySelector(".cityInput input");
const button = document.querySelector(".cityInput button");
const weatherIcon = document.querySelector("#icon");
const errorCode = document.querySelector("#error");
const weatherDetails = document.querySelector(".weatherInfo");
const townInfo = document.querySelector(".townDetails");
const weatherDescription = document.querySelector("#description");

// Function to show an element
function showElement(element) {
    element.classList.remove("hidden");
    element.classList.add("visible");
}

// Function to hide an element
function hideElement(element) {
    element.classList.remove("visible");
    element.classList.add("hidden");
}

async function getWeather(town) {
    const response = await fetch(apiUrl + town +`&appid=${apiKEY}`);
    const data = await response.json();

    //Display error text if the location does not exist and remove weather details
    if (response.status == 404) {
        showElement(errorCode);
        hideElement(weatherDetails);
        hideElement(townInfo);
        return;
    } else {
        /*switch (data.weather[0].main) {
            case "Clear":
                weatherIcon.src = "icons/clear.jpg";
                break;
            case "Rain":
                weatherIcon.src = "icons/rain.jpg";
                break;
            case "Drizzle":
                    weatherIcon.src = "icons/drizzle.jpg";
                break;
            case "Mist":
                weatherIcon.src = "icons/mist.jpg";
                break;
            default:
                weatherIcon.src = "icons/clear.jpg";
        } */

    //Updating DOM elements with weather data
        townName.innerHTML = data.name;
        temperature.innerHTML = Math.round(data.main.temp) + "°C";
        condition.innerHTML = data.weather[0].main;
        clouds.innerHTML = data.clouds.all + "%";
        winds.innerHTML = data.wind.speed + "km/h";
        humidity.innerHTML = data.main.humidity + "%";
        weatherDescription.innerHTML = data.weather[0].description;

        // Hide error code and show weather details and town info
        hideElement(errorCode);
        showElement(weatherDetails);
        showElement(townInfo);

    }

}

button.addEventListener("click", () => {
    getWeather(searchField.value);
})