<template>
  <div
    v-if="city"
    class="info"
  >
    <div class="info__header">
      <div class="info__time">
        Local time: {{ convertDateToLocalDate() }}
      </div>
      <div class="info__name">
        {{ city.name }},
        {{ city.sys.country }}
      </div>
      <div class="info__temp">
        {{ Math.round(city.main.temp) }}C
      </div>
    </div>
    <div class="info__item">
      <strong>Pressure:</strong> {{ city.main.pressure }}
    </div>
    <div class="info__item">
      <strong>Humidity:</strong> {{ city.main.humidity }}
    </div>
    <div class="info__item">
      <strong>Wind speed:</strong> {{ city.wind.speed }}
    </div>
    <div class="info__item">
      <strong>Weather main:</strong> {{ city.weather[0].main }}
    </div>
  </div>
</template>

<script>
import { convertDateToLocalDate } from "@/helpers";
export default {
  name: "CityInfo",

  props:{
    city: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    convertDateToLocalDate
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/vars";
  .info {
    margin-bottom: 80px;
    &__header {
      margin-bottom: 30px;
    }
    &__time, &__name {
      text-align: center;
      margin-bottom: 10px;
    }
    &__time {
      font-size: 14px;
    }
    &__name {
      font-weight: 600;
      font-size: 18px;
      color: $mainBlue;
    }
    &__temp {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin: 0 auto;
      font-size: 32px;
      color: $mainWhite;
      background: rgba(66,133,244,.8);
    }
    &__item {
      padding-bottom: 10px;
      margin-bottom: 18px;
      border-bottom: 1px solid $mainGray;
    }
  }
</style>
