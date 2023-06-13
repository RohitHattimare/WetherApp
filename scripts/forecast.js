class WeatherForecast {
    constructor() {
        this.key = 'OopGXhjLFeqI4Ay6vCthaG9a4ypohrND';
        this.myLocation = null;
        //To fetch Current location from cordinates    
        this.curCoordsURI = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=';
        this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search?apikey=';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.forecastURI = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    }

    //update city info
    async updateCity(cityName) {
        const cityDtl = await this.getCity(cityName);
        const weather = await this.getWeather(cityDtl.Key);
        const forecast = await this.getForecast(cityDtl.Key);
        return { cityDtl, weather, forecast };
    }

    //To fetch City Info
    async getCity(city) {
        const query = '&q=' + city;
        const url = this.cityURI + this.key + query;
        const response = await fetch(url);
        const data = await response.json();
        return data[0];
    }

    //To fetch Weather Info(passing key from city data)
    async getWeather(id) {
        const query = id + '?apikey=' + this.key + `&details=true`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }

    //To Fetch 5 Days of Forecast
    async getForecast(id) {
        const query = id + '?apikey=' + this.key + '&metric=true';
        const response = await fetch(this.forecastURI + query);
        const data = await response.json();
        return data;
    };

    // Get Current Location cordinates, promise is used as because cordinate is getting aftera while and empty variable is retuend.
    async getCurLocCoords() {
        if (navigator.geolocation) {
            return await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition((pos) => {
                    // console.log(pos.coords.latitude, pos.coords.longitude)
                    this.myLocation = (pos.coords.latitude + ',' + pos.coords.longitude);
                    console.log('mycoords', this.myLocation, typeof myLocation);
                    resolve(this.myLocation);
                }, (err) => {
                    reject(err);
                })
            })
        } else {
            reject('Geolocation not supported');
        }
    }

    //To fetch Current location from cordinates
    async getCoordsToCity(coords) {
        console.log(coords);
        // const base = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=';
        const query = '&q=' + coords;
        const response = await fetch(this.curCoordsURI + this.key + query);
        const data = await response.json();
        console.log('city name from coords', data);
        return data; //returning city data
    }
}
