<template>
  <div id="app" class="mx-auto container font-sans">
    <div class="flex justify-between">
      <router-link :to="{ name: 'play' }">Play (logo here)</router-link>
      <div>
        <router-link :to="{ name: 'login' }">Login</router-link>
        <span class="mx-2">|</span>
        <router-link :to="{ name: 'register' }">Register</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style>
a.router-link-exact-active {
  color: #42b983;
}
</style>
