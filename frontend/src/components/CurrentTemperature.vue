<template>
    <div class="current-temperature">
    <div class="current-temperature__icon-container">
      <!-- <img src="icons/mostly-sunny.svg" class="current-temperature__icon" alt=""> -->
      
      <img v-bind:src=icon class="current-temperature__icon" alt="">
    </div>
    <div class="current-temperature__content-container">
      <div class="current-temperature__value">{{temp}}&deg;</div>
      <div class="current-temperature__summary">{{cloud}}</div>
    </div>
  </div>
</template>

<script>

export default {

    name: 'CurrentTemperature',
    props: ['icon', 'temp', 'cloud'],
}
</script>

<style>

</style>
