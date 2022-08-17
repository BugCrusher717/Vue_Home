<template>
    <div id='weather'>
        <div id="Mainheader">
            <p id="time">Here is current Date & Time</p>
            <div id="cloudState">
                <img id="wicon" width="100" height="100" v-bind:src=this.iconUrl>
                <p id="cloud">{{ this.cloud }}</p>
            </div>
            <div id="temperature">
                <p id="temperature">{{ this.temperature }}°C </p>
            </div>

            <p id="wind">WindSpeed: {{ this.windSpeed }} m/s</p>
            <p id="humidity">Humidity: {{ this.humidity }} %</p>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
export default {
    name: "CurrentWeather",
    data() {
        return {
            root: "http://localhost:3000",
            latitude: 1.28340675598635,
            longitude: 103.816756914621,
            country: "",
            apiKey: 'e76639a2f11fd1a42584ba9908864bda',
            weatherData: null,
            cloud: "",
            iconUrl: "http://openweathermap.org/img/w/04d.png",
            windSpeed: "",
            temperature: "",
            max_temp: "",
            min_temp: "",
            humidity: "",
        }
    },
    component: {
    },

    created() {
        setInterval(() => { }, 1000);
        const success = (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.fetchWeatherData(this.latitude, this.longitude);
            // Do something with the position
        };
        const error = (err) => {
            console.log(err)
        };
        navigator.geolocation.getCurrentPosition(success, error);
    },
    methods: {
        saveWeatherData(userEmail) {
            axios.post(this.root + "/weathers/addInfo", {
                email: userEmail, timestamp: "202-07-19", weather: {
                    cloud: this.cloud,
                    cloudIcon: this.iconUrl,
                    temperature: this.temperature,
                    windSpeed: this.windSpeed,
                    humidity: this.humidity
                }
            })
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err.message);
                })
        },
        fetchWeatherData(lat, lng) {
            if (lat != null && lng != null)
                axios
                    .get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${this.apiKey}`
                    )
                    .then((res) => {
                        this.weatherData = res.data;
                        console.log(this.weatherData)
                        this.cloud = (this.weatherData.weather[0].description)
                        this.iconUrl = "http://openweathermap.org/img/w/" + this.weatherData.weather[0].icon + ".png"
                        this.temperature = Math.floor(this.weatherData.main.temp - 273.15);
                        this.max_temp = Math.floor(this.weatherData.main.temp_max - 273.15);
                        this.min_Temp = Math.floor(this.weatherData.main.temp_min - 273.15);
                        this.windSpeed = this.weatherData.wind.speed;
                        this.humidity = this.weatherData.main.humidity;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
        },
    },
    mounted: function () {
        this.fetchWeatherData(this.latitude, this.longitude);
    }
}
</script>

<style>
#header {
    height: 8em;
    align-items: center;
}

#Mainheader {
    width: 100%;
    margin-top: 3.75em;
    align-items: center;
    text-align: center;
}

#welcome {
    font-size: 3.25em;
    font-weight: bold;
    margin-bottom: 0;
}

/* p {
    font-size: 3em;
} */

#quote {
    font-size: 1.25em;
    margin-top: 0;
}
</style>
