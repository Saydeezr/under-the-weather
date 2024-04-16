const searchBtn = document.getElementById('searchBtn');
const weatherApiKey = '223145bd460816c9dd292b66ab0ede94';


searchBtn.addEventListener('click',event => {
    event.preventDefault();
    getCurrentWeather();
    getForecast();
})

function getCurrentWeather () {
    const input = document.getElementById('cityInput').value;
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${weatherApiKey}` 
    
    if(!input) {
        alert('Please enter a city')
        return;
    }

    fetch(weatherApiUrl)
       .then(response => response.json())
       .then(data => {
         displayCurrentWeather(data);
       })
       .catch(error => {
          alert('Error recieving current weather data. Please try again.')
       });
    
}

function getForecast(){
    const input = document.getElementById('cityInput').value;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${weatherApiKey}`

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            //displayHourlyForecast(data.list);
            console.log(data)
        })
        .catch(error => {
            alert('Error receiving hourly forecast data. Please try again.');
        });
}


function displayCurrentWeather(data) {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const cityName = data.name;

    console.log(`Current weather in ${cityName}: ${temperature}°C, ${description}`);
}




















    // const container = document.getElementById('weatherInfo')
    // let cityName = document.getElementById('cityName')
    // const icon = document.getElementById('weatherIcon')
    // const temperature = document.getElementById('temp')
    // const description = document.getElementById('description')
    
    // container.innerHTML = '';
    // temperature.innerHTML = '';
    // description.innerHTML = '';

    // if(data.cod === '404') {
    //     description.innerHTML = `<p>${data.message}<p>`;
    // } else{
    //     let city = data.name;
    //     let temp = Math.round(data.main.temp - 273.15);
    //     let descript = data.weather[0].description;
    //     let iconCode = data.weather[0].icon;
    //     let iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`
        
    //     const temperature = `<p>${temp}°C</p>`;
    //     const description = `<p>${city}</p> <p>${descript}</p>`;


  