<template>
  <div class="ListBox">
    <div class="next-5-days__row">

        <div class="next-5-days__date">
          {{date}}                               
          <div class="next-5-days__label">{{time}}</div>
         </div>

        <div class="next-5-days__low">
          {{temp}}&deg;
          <div class="next-5-days__label">temp</div>
        </div>

        <div class="next-5-days__high">
          {{high_temp}}&deg;
          <div class="next-5-days__label">High</div>
        </div>

        <div class="next-5-days__icon">
          <img v-bind:src=iconUrl alt="Sunny">
        </div>

        <div class="next-5-days__rain">
          {{humidity}}%
          <div class="next-5-days__label">Humidity</div>
        </div>

        <div class="next-5-days__wind">
          {{windSpeed}}m/s
          <div class="next-5-days__label">Wind</div>
        </div>

      </div>
  </div>
</template>

<script>
export default {
  name: 'ListBox',
  props: {
    date: String, 
    time: String, 
    iconUrl: String, 
    temp: Number,
    high_temp: Number,
    windSpeed: Number,
    humidity: Number
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
