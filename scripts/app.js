const city = document.querySelector('.nav form');
const sideData = document.querySelector('.data');
const date = new Date();
const wind = document.querySelector('.wind');
const airPressure = document.querySelector('.air-pressure');
const visibility = document.querySelector('.visibility');
const humidity = document.querySelector('.humidity');
const cardsList = document.querySelectorAll('.card');

console.log(cardsList);


const updateCity = async (cityName) => {
    const cityDtl = await getCity(cityName);
    const weather = await getWeather(cityDtl.Key);
    const forecast = await getForecast(cityDtl.Key);
    console.log(cityDtl, weather, forecast);
    return { cityDtl, weather, forecast };
};

const updateUi = (data) => {
    const city = data.cityDtl;
    const weather = data.weather;
    //update Left UI part
    sideData.innerHTML = `
    <div class="image">
    <img src="https://placehold.co/250x200" alt="wether">
    </div>
    <h1 class="temp">${weather.Temperature.Metric.Value}</h1>
    <h6 class="wether">${weather.WeatherText}</h6>
    <p class="day">Today . ${date.toLocaleDateString()} </p>
    <p class="loaction"> ${city.LocalizedName}</p>`

    //Update right UI 5 day Cards


    //update right UI boxes
    wind.innerHTML = `  
    <p>Wind Speed</p>
    <h2> ${weather.Wind.Speed.Metric.Value} ${weather.Wind.Speed.Metric.Unit}</h2>`;

    airPressure.innerHTML = `  
    <p>Air Pressure</p>
    <h2> ${weather.Pressure.Metric.Value} ${weather.Pressure.Metric.Unit}</h2>`;

    visibility.innerHTML = `  
    <p>Visibility/p>
    <h2>${weather.Visibility.Metric.Value} ${weather.Visibility.Metric.Unit}</h2>`;

    humidity.innerHTML = `
    <p>Humidity</p>
    <h2> ${weather.RelativeHumidity}</h2>`;
}
//Search city event 
city.addEventListener('submit', (e) => {
    e.preventDefault();
    //Get city value
    const cityName = city.city.value.trim();
    city.reset();
    //Update the UI with new city
    console.log(cityName);

    updateCity(cityName)
        .then(data => updateUi(data))
        .catch(err => console.log(err));
});