// const baseURL = 'http://dataservice.accuweather.com/locations/v1/topcities/search';

const showDetails = (data) => {

    const temp = data[0].Temperature.Metric.Value;
    const weather = data[0].WeatherText;
    const weatherIcon = data[0].WeatherIcon;
    const dayTime = data[0].IsDayTime;

    let time = dayTime ? "DAY" : "NIGHT";

    let temperature = document.querySelector('.temp');
    temperature.innerHTML = `${temp} &deg;C`;

    let localWeather = document.querySelector('.weather');
    localWeather.innerHTML = `${weather}`;
    
    let wIcon = document.querySelector('.wIcon');
    wIcon.innerHTML = `<img id="icon" src="img/icons/${weatherIcon}.svg" />`;

    let dayOrNigth = document.querySelector('.time');
    dayOrNigth.innerHTML = `${time}`;

}

const getConditions = async (cityKey) => {
    const baseURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const apiKey = "UbNbNFQ5WQi4uDydqHY30z3hJlHQTs59";
    const query = `${cityKey}?apikey=${apiKey}`;

    const response = await fetch(baseURL + query);
    data = await response.json();

    return data;
}

const getCity = async (city) => {
    const baseURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const apiKey = "UbNbNFQ5WQi4uDydqHY30z3hJlHQTs59";

    const query = `?apikey=${apiKey}&q=${city}`;
    const response = await fetch(baseURL + query);
    const data = await response.json();

    const location = data[0].EnglishName;
    const country = data[0].Country.LocalizedName;
        
    let locationInfo = document.querySelector('.location');
    locationInfo.innerHTML = `${location}, ${country}`;

    const showError = document.querySelector('.error');
    showError.innerHTML = '';

    return data;
}



const weather = () => {

    const weatherBtn = document.querySelector('#w-btn')
    console.log('radi')
    
    let cityName = document.querySelector('#input').value.trim();
        getCity(cityName)
        .then((data) => {
            return getConditions(data[0].Key);
        })
        .then((data) => {
            return showDetails(data)
        })
        .catch((err) => {
            const showError = document.querySelector('.error');
            if (err) {
                showError.innerHTML = `enter the city name in English`
            }
        })
}
