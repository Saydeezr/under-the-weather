const searchBtn = document.getElementById('searchBtn');
const weatherApiKey = '223145bd460816c9dd292b66ab0ede94';


searchBtn.addEventListener('click',event => {
    event.preventDefault();
    getCurrentWeather();
    getForecast();
})

function getCurrentWeather () {
    const input = document.getElementById('cityInput').value;
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${weatherApiKey}&units=imperial` 
    
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
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${weatherApiKey}&units=imperial`

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayDailyForecast(data.list);
            console.log(data)
        })
        .catch(error => {
            alert('Error receiving hourly forecast data. Please try again.');
        });
};


function displayCurrentWeather(data) {
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const cityName = data.name;
    const body = document.querySelector('.header')

    const newContainer = document.createElement('div')
    newContainer.classList.add('forecast')

    const city = document.createElement('h1');
    city.innerHTML = cityName;

    const temp = document.createElement('h2');
    temp.innerHTML = `${temperature}°F`;

    const additionalInfo = document.createElement('p');
    additionalInfo.innerHTML = description;

    newContainer.appendChild(city)
    newContainer.appendChild(temp)
    newContainer.appendChild(additionalInfo)
    body.appendChild(newContainer);
};



function displayDailyForecast(forecastData){
    const forecastContainer = document.querySelector('.subheader');
    forecastContainer.innerHTML = '';

    forecastData.forEach(day => {
        const date = new Date(day.dt * 1000);
        let iconCode = day.weather[0].icon;
        let iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`
        const temperature = day.main.temp;
        const description = day.weather[0].description;

        const newContainer = document.createElement('div');
        newContainer.classList.add(`dailyforecast`);

        const newDate = document.createElement('p');
        newDate.innerHTML = date.toLocaleDateString();
        newContainer.appendChild(newDate);

        const newTemp = document.createElement('h1');
        newTemp.innerHTML = `${temperature}°F`;
        newContainer.appendChild(newTemp);

        const conditions = document.createElement('h3');
        conditions.innerHTML = description;
        newContainer.appendChild(conditions);

        forecastContainer.appendChild(newContainer);
    })
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


  