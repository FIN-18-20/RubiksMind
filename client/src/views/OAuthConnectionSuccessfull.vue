<template>
  <h1>Wait for Auth</h1>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    provider: {
      type: String,
      required: true
    }
  },
  created() {
    if (this.$props.provider === undefined) {
      this.$router.push('/')
    }
  },
  mounted() {
    this.$axios.get('oauth-connection-successfull/' + this.$props.provider + '?code=' + this.$route.query.code)
      .then(async response => {
        console.log(response)
        if (response.status === 201) {
          const { refreshToken, token } = response.data
          await this.login({ token, refreshToken })
          this.$router.push('/')
        }
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 401: {
              console.warn(error.response.data)
              this.errorMessage = error.response.data
              break
            }
            case 403: {
              console.warn('You are already connected !')
              this.errorMessage = 'You are already connected !'
              break
            }
            default: {
              console.warn(error.response.data)
              break
            }
          }
        }
        else {
          console.error(error)
        }
      })
  },
  methods: {
    ...mapActions('auth', ['login']),
  }
}
</script>

<style>
</style>