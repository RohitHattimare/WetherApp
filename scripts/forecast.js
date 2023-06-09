const key = 'GASnYyllXMnLoKWbjmY009UHFA26TssM';

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
    const query = id + '?apikey=' + key;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
}

// getCity('chhindwara')
//     .then(response => getWeather(response.Key))
//     .then(data => console.log(data))
//     .catch(err => console.log(err));