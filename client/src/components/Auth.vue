<template>
  <div>
    <h1>{{ action | capitalize }}</h1>
    <form @submit.prevent="postAction" class="flex flex-col items-start justify-center w-128">
      <div class="w-128 flex flex-row justify-between px-12 my-2">
        <label for="username">Username</label>
        <input
          class="text-black ml-4 rounded"
          v-model="username"
          type="text"
          name="username"
          id="username"
        />
      </div>
      <div class="w-128 flex flex-row justify-between px-12 my-2">
        <label for="password">Password</label>
        <input
          class="text-black ml-4 rounded"
          v-model="password"
          type="password"
          name="password"
          id="password"
        />
      </div>
      <button
        class="w-64 mx-auto bg-blue-500 rounded my-2 p-1"
        type="submit"
      >{{ action | capitalize }}</button>

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
      authProvider: "local",
      actionsRoutes: {
        login: this.loginRoute,
        register: this.registerRoute
      }
    };
  },
  props: {
    action: {
      type: String,
      required: true,
      validator: function(value) {
        return ["login", "register"].indexOf(value) !== -1;
      }
    },
    loginRoute: {
      type: String,
      default: "login"
    },
    registerRoute: {
      type: String,
      default: "register"
    }
  },
  computed: {},
  methods: {
    async postAction() {
      if (this.authProvider === "local") {
        this.$axios
          .post(this.actionsRoutes[this.action], {
            username: this.username,
            password: this.password
          })
          .then(response => {
            if (response.status === 201) {
              window.location.href = response.data;
            }
          });
      } else {
        this.$axios
          .post(this.actionsRoutes[this.action] + this.authProvider)
          .then(response => {
            if (response.status === 201) {
              window.location.href = response.data;
            }
          });
      }
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>
