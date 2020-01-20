<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login" class="flex flex-col items-start justify-center w-128">
      <div class="w-128 flex flex-row justify-between px-12 my-2">
        <label for="username">Username</label>
        <input class="text-black ml-4 rounded" v-model="username" type="text" name="username" id="username" />
      </div>
      <div class="w-128 flex flex-row justify-between px-12 my-2">
        <label for="password">Password</label>
        <input class="text-black ml-4 rounded" v-model="password" type="password" name="password" id="password" />
      </div>
      <button class="w-64 mx-auto bg-blue-500 rounded my-2 p-1" type="submit">Login</button>

      <button @click="authProvider = 'github'">Github</button>
      <button @click="authProvider = 'google'">Google</button>

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
