<template>
    <div class="location-and-date" style = "box-sizing: border-box;">
        <h1 class="location-and-date__location">{{ region }}, {{ country }}</h1>
        <div>{{ this.currentDate }}</div>
    </div>
</template>

<script>



import moment from 'moment';

export default {

    name: 'App',
    props: ['region', 'country'],
    data() {
        return {
            currentDate: "",
        }
    },
    components: {
    },
    methods: {
        getCurrentDate: function () {
            this.currentDate = moment().format('dddd MMMM/DD')                
        }
    },
    mounted() {
        this.getCurrentDate()
    },
}
</script>

<style>
#app {
    margin: 12px;
    font-size: 100%;
    font-family: 'Open Sans', sans-serif;
    color: white;
    height: 100%;
    background: linear-gradient(to bottom, rgb(43, 50, 178) 0%, rgb(20, 136, 204) 100%);
    background-repeat: no-repeat;
    background-attachment: fixed;
}
</style>
