const api = {
    key: "a443addf45095f3bf34092dbe2924d82",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keypress', setQuery);

function setQuery(e) {
   if (e.keyCode == 13) {
        getResults(searchBox.value);

   }
}

function getResults(query) {

    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`).then(
        weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);

    let city = document.querySelector('.location .city');

    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();

    let date = document.querySelector('.location .date');

    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');

    temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>c</span>`;

    let weatherElement = document.querySelector('.current .weather');

    weatherElement.innerText = weather.weather[0].main;

    // feels like
    let feelsLike = document.querySelector('.feels-like');

    feelsLike.innerText = `Feels like ${Math.round(weather.main.feels_like)}c`;

    // hi&low

    let hiLow = document.querySelector('.hi-low');

    hiLow.innerText = `Lows ${Math.round(weather.main.temp_min)}c / Highs ${Math.round(weather.main.temp_max)}c`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
