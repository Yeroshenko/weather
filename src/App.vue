<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      this.$toast.open(
          {
            message: fbError,
            type: "error",
          },
          2000
      );
    },
  },
};
</script>

<style lang="scss" src="@/assets/styles/index.scss" />

