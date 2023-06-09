const key = 'VbU6qEryBbqbzPntb0h0JjRUwUM5f12w';

//To fetch City Info
const getCity = async (city) => {
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search?apikey=';
    const query = '&q=' + city;
    const url = base + key + query;
    const response = await fetch(url);
    const data = await response.json();
    return data[0];
}

//To fetch Weather Info(passing key from city data)
const getWeather = async (id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = id + '?apikey=' + key + `&details=true`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
}

//To Fetch 5 Days of Forecast
const getForecast = async (id) => {
    const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    const query = id + '?apikey=' + key + '&metric=true';
    const response = await fetch(base + query);
    const data = await response.json();
    return data;
}

// getCity('chhindwara')
//     .then(response => getWeather(response.Key))
//     .then(data => console.log(data))
//     .catch(err => console.log(err));