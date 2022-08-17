<template>
    <div class="weather-by-hour">
        <h2 class="weather-by-hour__heading">Today's weather</h2>
        <div class="weather-by-hour__container">
            <div v-for="todo in hourWeathers" :key="todo.id">
                <HourWeather :time="todo.time" :temp="todo.temp" :icon="todo.icon"></HourWeather>
            </div>
        </div>
    </div>
</template>

<script>


import axios from 'axios';
import HourWeather from './HourWeather.vue';
import { ref, computed, watchEffect } from 'vue';


export default {
    name: "TodayWeather",
    components: { HourWeather },
    props: {
        latitude: String,
        longitude: String,
    },
    setup(props) {
        const apiKey = ref('beabfc07ddaf4eb06e17e8e5f6325002');
        const hourWeathers = ref([]);
        const latitude = computed(() => props.latitude);
        const longitude = computed(() => props.longitude);

        // onMounted(() => {
        //     // console.log(child_latitude, child_longitude)
        //     if (latitude.value != '' && longitude.value != '')
        //         fetchTodayWeather(latitude.value, longitude.value);
        // })

        watchEffect(() => {
            if (latitude.value != '' && longitude.value != '')
                fetchTodayWeather(latitude.value, longitude.value);
        });

        const fetchTodayWeather = (lati, long) => {
            // console.log(lati, long)
            axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${long}&appid=${apiKey.value}`)
                .then((res) => {
                    let weatherData = res.data;
                    for (let index = 0; index < 7; index++) {
                        let time = (index + 1) * 3;
                        if (time > 12) time = time - 12 + 'pm'
                        else time = time + 'am'
                        let temp = Math.floor(weatherData.list[index].main.temp - 273.15);
                        let icon = "http://openweathermap.org/img/w/" + weatherData.list[index].weather[0].icon + ".png";
                        hourWeathers.value.push({ key: (index + 1), time: time, temp: temp, icon: icon });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        return {
            apiKey,
            hourWeathers,
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
