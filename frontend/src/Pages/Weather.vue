<template>
  <div class='signBtnGroup'>
    <a class='salmon' @click="handleSignIn"><span>Sign In </span></a>
    <a class='salmon'  @click="handleSignUp"><span>Sign Up </span></a>
  </div>
  <div>
    <!-- Using modifiers -->

  </div>

  <p>Today Weather</p>
  <LocationDate :country="country" :region="region" />
  <CurrentTemperature :icon='iconUrl' :temp='temperature' :cloud='cloud'></CurrentTemperature>
  <CurrentStates :highTemp='high_temperature' :lowTemp='low_temperature' :windSpeed='windSpeed' :humidity='humidity' />
  <TodayWeather :latitude='latitude' :longitude='longitude' />
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router"
import LocationDate from '@/components/LocationDate.vue'
import CurrentTemperature from '@/components/CurrentTemperature.vue'
import CurrentStates from '@/components/CurrentStates.vue'

// import { log } from 'console'
import TodayWeather from '@/components/TodayWeather.vue'

import axios from 'axios'


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Weather',
  components: {
    LocationDate,
    CurrentTemperature,
    CurrentStates,
    TodayWeather
  },
  setup() {
    const router = useRouter();
    const latitude = ref("");
    const longitude = ref("");

    const apiKey = ref('beabfc07ddaf4eb06e17e8e5f6325002');
    const country = ref(""), region = ref("");
    const cloud = ref("")
    const iconUrl = ref("");
    const high_temperature = ref(""), low_temperature = ref("");
    const windSpeed = ref(""), temperature = ref("");
    const humidity = ref("");

    onMounted(() => {
      setInterval(() => { }, 1000);
      function success(pos) {
        const crd = pos.coords;
        latitude.value = crd.latitude;
        longitude.value = crd.longitude;
        fetchWeatherData(latitude.value, longitude.value);
      }
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      navigator.geolocation.getCurrentPosition(success, error);
    });

    const handleSignIn = () => {
      router.push({ name: "sign-in" });
    };
    const handleSignUp = () => {
      router.push({ name: "sign-up" });
    };
    const fetchWeatherData = (lati, long) => {
      if (lati != "" && long != "") {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude.value}&lon=${longitude.value}&appid=${apiKey.value}`
          )
          .then((res) => {
            let weatherData = res.data;

            region.value = weatherData.name;

            country.value = weatherData.sys.country;            

            iconUrl.value = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png"

            temperature.value = Math.floor(weatherData.main.temp - 273.15);
            cloud.value = (weatherData.weather[0].description)
            cloud.value = cloud.value.charAt(0).toUpperCase() + cloud.value.substring(1);

            high_temperature.value = Math.floor(weatherData.main.temp_max - 273.15);
            low_temperature.value = Math.floor(weatherData.main.temp_min - 273.15);
            windSpeed.value = weatherData.wind.speed;
            humidity.value = weatherData.main.humidity;


          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    return {
      current_date: "",
      latitude,
      longitude,
      country,
      region,
      cloud,
      iconUrl: "http://openweathermap.org/img/w/04d.png",
      high_temperature,
      low_temperature,
      windSpeed,
      temperature,
      humidity,
      handleSignIn,
      handleSignUp,
      fetchWeatherData,
    };
  }
}
</script>

<style>
p {
  text-align: center;
  font-size: 40px;
}

.signBtnGroup {
  position: fixed;
  right: 10px;
}

.salmon {
  padding: 5px 10px;
  margin-top: 10px;
  margin-bottom: 0;
  margin-right: 20px;
  background: transparent;
  color: white;
  text-align: center;
  border: 0.05em solid white;
  border-radius: 20px;
  width: 120px;
}

.salmon:hover {
  cursor: pointer;
  border: 0.2em solid white;
}
</style>