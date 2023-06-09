const city = document.querySelector('.nav input');
const sideData = document.querySelector('.data');

const updateCity = async (cityName) => {
    const cityDtl = await getCity(cityName);
    const weather = await getWeather(cityDtl.Key);
    console.log(cityDtl, weather);
    return { cityDtl, weather };
};


//Search city event 
city.addEventListener('keyup', (e) => {
    updateCity(e.target.value)
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

);