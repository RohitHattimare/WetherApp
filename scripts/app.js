const city = document.querySelector('.nav form');
const sideData = document.querySelector('.data');
const date = new Date();
const wind = document.querySelector('.wind');
const airPressure = document.querySelector('.air-pressure');
const visibility = document.querySelector('.visibility');
const humidity = document.querySelector('.humidity');
const cardList = document.querySelector('.card-list');
const currLocButton = document.querySelector('.nav i');



//Get City from API
const updateCity = async (cityName) => {
    const cityDtl = await getCity(cityName);
    const weather = await getWeather(cityDtl.Key);
    const forecast = await getForecast(cityDtl.Key);
    // const curLoc = await getCurrentLocation();
    console.log('cityDtl', cityDtl);
    console.log('weather', weather);
    console.log('forecast', forecast);

    return { cityDtl, weather, forecast };
};

//To convert one digit no. to 2 digits
const twoDigit = (num) => {
    return num < 10 ? `0${num}` : num;
}

//Update UI components for wholepage
const updateUi = (data) => {
    const { cityDtl, weather, forecast } = data;
    console.log('cityDtl', cityDtl);
    console.log('weather', weather);
    console.log('forecast', forecast);

    //Min and Max temp from forecast
    const forcstData = forecast.DailyForecasts.map((item) => {
        const date = new Date(item.Date);
        const day = {
            day: date.toLocaleDateString(),
            maxTemp: item.Temperature.Maximum.Value + item.Temperature.Maximum.Unit,
            minTemp: item.Temperature.Minimum.Value + item.Temperature.Minimum.Unit,
            icon: `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${twoDigit(item.Day.Icon)}-s.png`,
            wType: item.Day.IconPhrase,
        };
        return day;
    });

    // update Left UI part
    sideData.innerHTML = `
        <div class="image">
            <img src="https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${twoDigit(weather.WeatherIcon)}-s.png" width="250px" height="200px"alt="wether">
        </div>
        <h1 class="temp">${weather.Temperature.Metric.Value}</h1>
        <h6 class="wether">${weather.WeatherText}</h6>
        <p class="day">Today . ${date.toLocaleDateString()} </p>
        <p class="loaction"> ${cityDtl.LocalizedName}</p>
    </div>`;


    // Update right UI 5 day Cards
    const cards = forcstData.map((item) => {
        return `
            <div class="card">
                <p class="day">${item.day}</p>
                <img src="${item.icon}" alt="icon" className="icon" />
                <p> ${item.wType}</p>
                <div class="temp">
                    <p class="min">${item.minTemp}</p>
                    <p class="max">${item.maxTemp}</p>
                </div>
            </div>`;
    }).join('');

    cardList.innerHTML = cards;

    //update right UI boxes
    wind.innerHTML = `
        <p> Wind Speed </p>
        <h2> ${weather.Wind.Speed.Metric.Value} ${weather.Wind.Speed.Metric.Unit}</h2>`;

    airPressure.innerHTML = `
        <p> Air Pressure</p >
        <h2> ${weather.Pressure.Metric.Value} ${weather.Pressure.Metric.Unit}</h2>`;

    visibility.innerHTML = `
        <p> Visibility </p>
        <h2>${weather.Visibility.Metric.Value} ${weather.Visibility.Metric.Unit}</h2>`;

    humidity.innerHTML = `
        <p> Humidity </p>
        <h2> ${weather.RelativeHumidity}</h2>`;
}

//Search city event 
city.addEventListener('submit', (e) => {
    e.preventDefault();
    //Get city value
    const cityName = city.city.value.trim();
    city.reset();
    //Update the UI with new city
    updateCity(cityName)
        .then(data => updateUi(data))
        .catch(err => console.log(err));
});

// current location buton event
currLocButton.addEventListener('click', () => {
    curLocCoords2()
        .then(coords => getCurrentLocation(coords))
        .then(cityN => updateCity(cityN))
        .then(data => updateUi(data))
        .catch(err => console.log('err', err));
});

