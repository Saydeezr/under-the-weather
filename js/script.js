
const weatherApiKey = '223145bd460816c9dd292b66ab0ede9'
//const weatherApiUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`
//const geoConvertApi =`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${geoConvertApi}`
const input = document.getElementById('cityInput')


submit.addEventListener('click',event => {
    event.preventDefault();
    getWeather();
    // const location = location.value;
    // if(location){
    //     getData();
    // } else 
    // if(!location) {
    //     alert('City name is required')
    // }
})

function getWeather () {
    const weatherApiKey = '223145bd460816c9dd292b66ab0ede9'
    const city = document.getElementById('input').value;

    if(!city) {
        alert('Please enter a city')
        return;
    };

    const weatherApiUrl = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}` 
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}`
       
    fetch(weatherApiUrl)
       .then(response => response.json())
       .then(data => {
         getWeather(data);
       })
       .catch(error => {
          alert('Error recieving current weather data. Please try again.')
       });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            alert('Error receiving hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const container = document.getElementById('weatherInfo')
    let cityName = document.getElementById('cityName')
    const icon = document.getElementById('weatherIcon')
    const temperature = document.getElementById('temp')
    const description = document.getElementById('description')
    
    container.innerHTML = '';
    temperature.innerHTML = '';
    description.innerHTML = '';

    if(data.cod === '404') {
        description.innerHTML = `<p>${data.message}<p>`;
    } else{
        let city = data.name;
        let temp = Math.round(data.main.temp - 273.15);
        let descript = data.weather[0].description;
        let iconCode = data.weather[0].icon;
        let iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`
        
        const temperature = `<p>${temp}°C</p>`;
        const description = `<p>${city}</p> <p>${descript}</p>`;


    }
}