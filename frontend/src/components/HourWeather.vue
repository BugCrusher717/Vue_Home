<template>
    <div class="weather-by-hour__item">
        <div class="weather-by-hour__hour">{{time}}</div>
        <img v-bind:src=icon alt="Mostly sunny">
        <div>{{temp}}&deg;</div>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: ['time', 'icon', 'temp'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
