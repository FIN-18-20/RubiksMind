<template>
  <div id="app" class="mx-auto container">
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
a.router-link-exact-active {
  color: #42b983;
}
</style>
