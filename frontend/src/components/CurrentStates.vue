<template>
  <div class="current-stats">
    <div>
      <div class="current-stats__value">{{highTemp}}&deg;</div>
      <div class="current-stats__label">High</div>
      <div class="current-stats__value">{{lowTemp}}&deg;</div>
      <div class="current-stats__label">Low</div>
    </div>
    <div>
      <div class="current-stats__value">{{windSpeed}}m/s</div>
      <div class="current-stats__label">Wind</div>
      <div class="current-stats__value">{{humidity}}%</div>
      <div class="current-stats__label">Humidity</div>
    </div>
    <div>
      <div class="current-stats__value">05:27</div>
      <div class="current-stats__label">Sunrise</div>
      <div class="current-stats__value">20:57</div>
      <div class="current-stats__label">Sunset</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentState',
  props: ['highTemp', 'lowTemp', 'windSpeed', 'humidity']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
