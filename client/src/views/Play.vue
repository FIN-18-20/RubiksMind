<template>
  <div>
    <h1>Play</h1>
    <button @click="test">Test</button>
    <br/>
    <button @click="getRefreshToken">RT</button>
    <br/>
    <button @click="getJwtToken">JWT</button>
  </div>
</template>

<script>
export default {
  methods: {
    test() {
      this.$axios.get('/test-auth').then(response => console.log(response));
    },
    async getRefreshToken() {
      console.log(await this.$store.dispatch('auth/getRefreshToken'))
    },
    async getJwtToken() {
      console.log(await this.$store.dispatch('auth/getJwtToken'))
    }
  }
}
</script>
