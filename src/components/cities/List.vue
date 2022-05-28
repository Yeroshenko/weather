<template>
  <div class="list">
    <div
      v-if="defaultCity"
      class="list__default"
    >
      Default City:
      <span
         class="list__default-elem"
         @click="fetchByName(defaultCity.name)"
      >
         {{ defaultCity.name }}
      </span>
    </div>
    <vs-table
      v-if="cities.length"
      max-items="5"
      pagination
      search
      :data="cities"
    >
      <template slot="header">
        <h2>
          Cities
        </h2>
      </template>
      <template slot="thead">
        <vs-th>
          #
        </vs-th>
        <vs-th>
          Name
        </vs-th>
        <vs-th>
          Options
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr
          :key="indextr" v-for="(tr, indextr) in data"
          class="list__row"
          :class="{
            'active': city && data[indextr].name === city.name,
            'default': defaultCity && data[indextr].name === defaultCity.name
          }"
        >
          <vs-td :data="[indextr]">
            {{ cities.indexOf(data[indextr]) + 1 }}
          </vs-td>
          <vs-td
            :data="data[indextr].name"
            class="list__name-td"
          >
            <span
              class="list__name"
              @click="fetchByName(data[indextr].name)"
            >
              {{data[indextr].name}}
            </span>
          </vs-td>
          <vs-td class="list__options">
            <vs-button
              color="primary" type="flat"
              :class="{'hidden': defaultCity && data[indextr].name === defaultCity.name}"
              @click="setDefaultCity(data[indextr])"
            >
              Set as default
            </vs-button>
            <vs-button
              color="danger"
              type="flat"
              @click="cityToDelete(data[indextr])"
            >
              Delete
            </vs-button>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
export default {
  name: "CitiesList",

  props:{
    cities: {
      type: Array,
      default: () => []
    },
    city: {
      type: Object,
      default: () => {}
    },
    defaultCity: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    fetchByName(name) {
      this.$emit('fetchByName', name)
    },
    setDefaultCity(city) {
      this.$store.commit("cities/setDefaultCity", city);
    },
    cityToDelete(city) {
      this.$emit('cityToDelete', city)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/vars";
  .list {
    &__name {
      cursor: pointer;
      padding: 20px;
      display: block;
      &-td {
        padding: 0 !important;
      }
    }
    &__options {
      width: 35%;
    }
    &__row {
      &.active {
        background: $mainGray;
      }
      &.default {
        background: rgba(66, 133, 244, 0.1);
      }
    }
    &__default {
      font-size: 14px;
      margin-bottom: 22px;
      font-weight: 600;
      &-elem {
        color: $mainBlue;
        cursor: pointer;
      }
    }
  }
</style>
