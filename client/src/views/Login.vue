<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login" class="text-black">
      <div>
        <label for="username">Username</label>
        <input v-model="username" type="text" name="username" id="username" />
        <label for="password">Password</label>
        <input v-model="password" type="password" name="password" id="password" />
      </div>

      <button @click="authProvider = 'github'">Github</button>
      <button @click="authProvider = 'google'">Google</button>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      authProvider: 'local',
      authProviderList: [
          'local',
          'github'
      ]
    };
  },
  methods: {
    async login() {
      this.$axios.post("login", {
        username: this.username,
        password: this.password,
        provider: this.authProvider
      })
      .then(response => {
          if(response.status === 201) {
              window.location.href = response.data;
          }
      });
    }
  }
};
</script>
