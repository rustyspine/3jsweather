
async function checkWeather() {
    //build url
    const apiKey = "074b1a282e8eafd7a300d5184d15b792";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=";
    let cityName = document.getElementById("city-input").value;
    let apiURL = `${url}${cityName}&appid=${apiKey}&units=imperial`;
        
    //api call
    const response = await fetch(apiURL);
    let data = await response.json();

    //change info
    document.getElementById("city").innerHTML = data.name;
    document.getElementById("temp").innerHTML = "Temperature: " + data.main.temp + " °F";
    document.getElementById("feels-like").innerHTML = "Feels Like: " + data.main.feels_like + " °F";
    document.getElementById("wind").innerHTML = "Wind: " + data.wind.speed + " mph";
    document.getElementById("gust").innerHTML = "Gusts: " + data.wind.gust + " mph";
    document.getElementById("min").innerHTML = "Max Temp: " + data.main.temp_max + " °F";
    document.getElementById("max").innerHTML = "Min Temp: " + data.main.temp_min + " °F";
    document.getElementById("sunrise").innerHTML = "Sunrise: " + data.sys.sunrise;
    document.getElementById("sunset").innerHTML = "Sunset: " + data.sys.sunset;

    //show data
    document.getElementById('sunset-card').classList.remove("hidden");
    document.getElementById('temp-card').classList.remove("hidden");
    document.getElementById('img-card').classList.remove("hidden");
    document.getElementById('wind-card').classList.remove("hidden");
    document.getElementById('forecast-card').classList.remove("hidden");


    //change image
    if (data.weather[0].main == 'Clear') {
        document.getElementById("weather-img").src = "img/sunny.svg";
    }
    if (data.weather[0].main == 'Clouds') {
        document.getElementById("weather-img").src = "img/mostlyCloud.svg";
    }
    if (data.weather[0].main == 'Snow') {
        document.getElementById("weather-img").src = "img/snow.svg";
    }
    if (data.weather[0].main == 'Rain') {
        document.getElementById("weather-img").src = "img/rainy.svg";
    }
    if (data.weather[0].main == 'Wind') {
        document.getElementById("weather-img").src = "img/wind.svg";
    }


    //update forecast

    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
    const fresponse = await fetch(forecastURL);
    let fdata = await fresponse.json();

    let index = 0;
    for (let i = 0; i < 40; i += 8) {
        let item = "forecast-temp" + index;
        document.getElementById(item).innerHTML = fdata.list[i].main.temp + " °F";
        let date = "forecast-date" + index;
        let date1 = fdata.list[i].dt_txt.split(" ")[0];
        document.getElementById(date).innerHTML = date1;
       
        let image = "forecast-img" + index;
        if (fdata.list[i].weather[0].main == "Rain") {
            document.getElementById(image).src = "img/rainy.svg";
        }
        if (fdata.list[i].weather[0].main == "Clear") {
            document.getElementById(image).src = "img/sunny.svg";
        }
        if (fdata.list[i].weather[0].main == "Clouds") {
            document.getElementById(image).src = "img/mostlyCloud.svg";
        }
        if (fdata.list[i].weather[0].main == "Snow") {
            document.getElementById(image).src = "img/snow.svg";
        }

        index++;
    }

    console.log(fdata);

    //log api call and response
    //console.log(apiURL);
    //console.log(data);
}
