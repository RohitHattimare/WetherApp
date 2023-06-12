const key = 'xeVjosYTh3p96mZkhIhcy9PpejBzNfll';
let myLocation = null;

//To fetch Current location from cordinates
const getCurrentLocation = async (coords) => {
    console.log(coords);
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=';
    const query = '&q=' + coords;
    const response = await fetch(base + key + query);
    const data = await response.json();
    console.log('city name from coords', data);
    return data; //returning city data
};

//Get Current Location cordinates
const curLoc = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            // console.log(pos.coords.latitude, pos.coords.longitude)
            myLocation = pos.coords.latitude + ',' + pos.coords.longitude;
            console.log('mycoords', myLocation, typeof myLocation);
            return myLocation;
        }, (err) => {
            console.log(err);
        })
    }
};

console.log(curLoc());
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

//current location buton event
// currLocButton.addEventListener('click', () => {
//     getCurrentLocation(curLoc())
//         .then(data => console.log(data))
//         .catch(err => console.log(err));
// });
// getCity('chhindwara')
//     .then(response => getWeather(response.Key))
//     .then(data => console.log(data))
//     .catch(err => console.log(err));