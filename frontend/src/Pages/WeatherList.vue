<template>
  <div class='signBtnGroup'>
    <a class='salmon' @click="handleSignOut"><span>Sign Out </span></a>
  </div>
  <div>
    <!-- Using modifiers -->

  </div>

  <p>Today Weather</p>
  <LocationDate :country="country" :region="region" />
  <CurrentTemperature :icon='iconUrl' :temp='temperature' :cloud='cloud'></CurrentTemperature>
  <CurrentStates :highTemp='high_temperature' :lowTemp='low_temperature' :windSpeed='windSpeed' :humidity='humidity' />
  <div v-for="(todo, idx) in savedInfo" :key="idx">
    <Listbox :date='todo.date' :time='todo.time' :temp='todo.temp' :iconUrl='todo.iconUrl' :high_temp='todo.high_temp'
      :humidity='todo.humidity' :windSpeed='todo.windSpeed' />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router"
import LocationDate from '@/components/LocationDate.vue'
import CurrentTemperature from '@/components/CurrentTemperature.vue'
import CurrentStates from '@/components/CurrentStates.vue'
import Listbox from '@/components/Listbox.vue';
import moment from 'moment';
import { useAuth0 } from '@auth0/auth0-vue';

import axios from 'axios'
// import { computed } from 'vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Weather',
  components: {
    LocationDate,
    CurrentTemperature,
    CurrentStates,
    Listbox,
  },
  props: ['useremail', 'signed'],
  setup(props) {
    console.log(props.useremail)

    const root = ref("http://localhost:3000");

    const router = useRouter();
    const signed = ref(props.signed);
    const latitude = ref("");
    const longitude = ref("");
    const { logout } = useAuth0();

    const apiKey = ref('beabfc07ddaf4eb06e17e8e5f6325002');
    const country = ref(""), region = ref("");
    const cloud = ref("")
    const iconUrl = ref("");
    const high_temperature = ref(""), low_temperature = ref("");
    const windSpeed = ref(""), temperature = ref("");
    const humidity = ref("");
    const savedInfo = ref([]);
    onMounted(() => {
      setInterval(() => { }, 1000);
      function success(pos) {
        const crd = pos.coords;
        latitude.value = crd.latitude;
        longitude.value = crd.longitude;
        fetchWeatherData(latitude.value, longitude.value);
        console.log(latitude.value, longitude.value)
      }
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      navigator.geolocation.getCurrentPosition(success, error);
    });

    const handleSignOut = () => {
      if (signed.value === 2)
        logout({ returnTo: "https://127.0.0.1:8081/#/weather" })
      else
        router.push({ name: "weather" });
    };

    const saveInformation = () => {
      if (temperature.value != '') {
        console.log("!!!!!!!!!11",signed.value)
        if (signed.value != 0) {
          console.log("$$$$$$$$$$$$$$$$$$$$$", signed.value)
          let cur_date = moment().format('MMMM/DD')
          let cur_time = moment().format("hh:mm A")
          console.log(cur_date, cur_time)
          let weatherData = { iconUrl: iconUrl.value, temp: temperature.value, high_temp: high_temperature.value, windSpeed: windSpeed.value, humidity: humidity.value }
          let saveData = { email: props.useremail, date: cur_date, time: cur_time, weather: weatherData }
          axios.post(root.value + "/weathers/addInfo", saveData)
            .then(res => {
              console.log(res.data);
              getSavedInformation()
            }).catch(err => {
              console.log(err.message);
            })
        }
      }
    }

    const getSavedInformation = () => {
      axios.get(root.value + '/weathers/getInfo', { params: { email: props.useremail } })
        .then(res => {
          res.data.map((data, index) => {
            savedInfo.value.push({ key: index + 1, date: data.date, time: data.time, ...data.weather })
          })
          savedInfo.value.reverse();
        }).catch(err => {
          console.log(err.message);
        })
    }
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

            saveInformation()
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
      savedInfo,
      handleSignOut,
      fetchWeatherData,
      saveInformation,
      getSavedInformation
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