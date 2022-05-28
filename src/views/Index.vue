<template>
  <div class="app">
    <div class="container">
      <h1 class="app__title">Weather app</h1>
      <div class="app__header">
        <form
          @submit.prevent="handleSubmit"
          class="app__form"
        >
          <vs-row vs-w="12">
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="10" >
              <vs-input
                class="inputx"
                placeholder="Enter city name min (3 letters)"
                v-model="query"
                @keyup="isCityError= false"
              />
            </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2" >
              <vs-button color="primary" button="submit" type="filled" :disabled="query.length < 3">Add</vs-button>
            </vs-col>
          </vs-row>
        </form>
        <Transition name="el" v-if="isCityError">
          <p class="app__info-text">City hasn't been found</p>
        </Transition>
      </div>
      <div class="app__info">
        <info :city="city"/>
      </div>
      <div
        v-if="cities.length"
        class="app__data"
      >
        <list
          :cities="cities"
          :city="city"
          :default-city="defaultCity"
          @fetchByName="fetchByName"
          @cityToDelete="cityToDelete"
        />
      </div>
      <div v-else>
        No cities data
      </div>
    </div>
    <vs-popup
      v-if="cityDelete"
      class="holamundo"
      title="Delete city"
      :active.sync="isPopUpActive"
    >
      <p class="pop-up-text">Are you sure you want to delete city <strong>{{ cityDelete.name }}</strong> ?</p>
      <vs-button
        color="primary"
        type="line"
        class="pop-up-btn"
        @click="isPopUpActive = false"
      >
        Cancel
      </vs-button>
      <vs-button
        color="danger"
        type="line"
        class="pop-up-btn"
        @click="deleteCity"
      >
        Delete
      </vs-button>
    </vs-popup>
  </div>
</template>

<script>
import List from "@/components/cities/List";
import Info from "@/components/cities/Info";

export default {
  name: 'Index',

  components: {
    List,
    Info,
  },

  data() {
    return {
      query: '',
      isCityError: false,
      isPopUpActive: false,
      cityDelete: null,
    }
  },

  computed: {
    cities() {
      return this.$store.getters["cities/cities"];
    },
    defaultCity() {
      return this.$store.getters["cities/defaultCity"]
    },
    city() {
      return this.$store.getters["cities/activeCity"]
    }
  },

  methods: {
    getCurrentCoords() {
      navigator.geolocation.getCurrentPosition(
          position => {
            this.fetchByCoords(position.coords.latitude, position.coords.longitude)
          },
          error => {
            this.$toast.open(
                {
                  message: error.message,
                  type: "error",
                },
                2000
            );
          },
      )
    },
    async fetchByCoords(latitude, longitude) {
      try {
        this.$vs.loading();
        await this.$store.dispatch("cities/getWeatherByCoords", {
          latitude,
          longitude
        })
        this.$vs.loading.close();
      } catch(e) {
        console.log(e);
      }
    },
    async fetchByName(name) {
      try {
        this.$vs.loading();
        await this.$store.dispatch("cities/getWeatherCity", name);
        this.$vs.loading.close();
      } catch(e) {
        console.log(e);
      }
    },
    async handleSubmit() {
      try {
        this.$vs.loading();
        const data = await this.$store.dispatch("cities/getWeatherCity", this.query);
        this.$vs.loading.close();
        if (!data) {
          this.isCityError = true;
          return;
        }
        this.query = '';
        this.$toast.open(
            {
              message: 'City added',
              type: "success",
            },
            2000
        );
      } catch(e) {
        console.log(e);
      }
    },
    cityToDelete(city) {
      this.cityDelete = city;
      this.isPopUpActive = true;
    },
    deleteCity() {
      this.$store.commit("cities/deleteCity", this.cityDelete);
      this.$toast.open(
          {
            message: 'City deleted',
            type: "error",
          },
          2000
      );
      this.isPopUpActive = false;
    }
  },

  mounted() {
    this.getCurrentCoords();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/vars";
.app {
  padding: 80px 0;
  &__form {
    margin-bottom: 20px;
  }
  &__title {
    text-align: center;
    margin-bottom: 25px;
    text-transform: capitalize;
  }
  &__header {
    margin-bottom: 40px;
  }
  &__info {
    &-text {
      color: $mainRed;
      margin-bottom: 50px;
    }
  }
}

</style>
