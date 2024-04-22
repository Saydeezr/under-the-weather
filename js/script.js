const searchBtn = document.getElementById('searchBtn');
const weatherApiKey = '761cd3c2f9eb022af715ad170027732f';
const recentSearch = [];

searchBtn.addEventListener('click',event => {
    event.preventDefault();
    getCurrentWeather();
    getForecast();
});

function getCurrentWeather () {
    const input = document.getElementById('cityInput').value;
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${weatherApiKey}&units=imperial` 
    if(!input) {
        alert('Please enter a city')
        return;
    } 
    //get current weather data from API
    fetch(weatherApiUrl)
       .then(response => response.json())
       .then(data => {
        displayCurrentWeather.innerHTML = '';
         displayCurrentWeather(data);
       }) //show eror if data not received correctly
       .catch(error => {
          alert('Error recieving current weather data. Please try again.')
       });
      //set given data to save in local storage
       localStorage.setItem('recentCity', JSON.stringify(input));
       recentSearch.push(input)
       storeRecents();
}

//
function storeRecents(){
    const storedItem = JSON.parse(localStorage.getItem('recentCity'));
    console.log('storedItem', storedItem)
    const input = document.getElementById('cityInput').value;
    const city = document.getElementById('recents')
    recentSearch.push(storedItem)

    let addCity = document.createElement('li')
    // addCity.textContent = storedItem;
   
    const weatherLink = document.createElement('a')
    weatherLink.href = ``
    weatherLink.textContent = storedItem

    addCity.appendChild(weatherLink);
    city.appendChild(addCity);
};


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

    for(let i=0;i<forecastData.length;i=i+8){
        let day = forecastData[i]
        console.log(day)
        const date = new Date(day.dt * 1000);
        console.log(date)
        let iconCode = day.weather[0].icon;
        let iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`
        const temperature = Math.round(day.main.temp);
        const description = day.weather[0].description;

        const newContainer = document.createElement('div');
        newContainer.classList.add(`dailyforecast`);

        const newDate = document.createElement('p');
        newDate.innerHTML = date.toLocaleDateString();
        newContainer.appendChild(newDate);

        const weatherIcon = document.createElement('img');
        weatherIcon.src = iconURL;
        newContainer.appendChild(weatherIcon);

        const newTemp = document.createElement('h1');
        newTemp.innerHTML = `${temperature}°F`;
        newContainer.appendChild(newTemp);

        const conditions = document.createElement('h3');
        conditions.innerHTML = description;
        newContainer.appendChild(conditions);

        forecastContainer.appendChild(newContainer);
    }
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


  