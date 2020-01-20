<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login" class="text-black">
        <label for="authMethod">Authentication provider</label>
        <select v-model="authProvider" name="authMethod" id="authMethod">
            <option v-for="provider in authProviderList" :key="provider" :value="provider">{{ provider }}</option>
        </select>
      <div>
        <label for="username">Username</label>
        <input v-model="username" type="text" name="username" id="username" />
        <label for="password">Password</label>
        <input v-model="password" type="password" name="password" id="password" />
      </div>

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
          'facebook',
          'google',
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
