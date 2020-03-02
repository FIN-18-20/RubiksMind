<template>
  <div class="w-full flex flex-col md:flex-row justify-center mr-10">
    <div class="relative mr-8 mt-56" style="width:280px;">
      <img class="absolute z-10 inline-block" style="top:-70px;left:85px;" src="@/assets/img/cube-logo.svg" alt="cube logo" />
      <div class="relative z-20">
        <h2 class="text-blue-100 text-2xl font-bold italic leading-none"><span class="text-3xl">J</span>OIN OUR COMMUNITY</h2>
        <h3 class="text-blue-100 text-base font-medium italic text-right leading-none">& beat your pb's!</h3>
      </div>
    </div>
    <FormAuth action="register" />
    <!-- <Auth action="register" /> -->
  </div>
</template>

<script>
import FormAuth from '../components/FormAuth'
// import Auth from '../components/Auth'
export default {
  components: {
    // Auth,
    FormAuth
  }
}
</script>
