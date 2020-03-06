<template>
  <div>
    <img src="@/assets/img/leaderboard-cube.svg" alt="left cube" class="absolute leftCube w-76 z-20 select-none hidden sm:block">
    <img src="@/assets/img/leaderboard-cube.svg" alt="left cube" class="absolute midCube w-114 z-0 select-none hidden sm:block">
    <div class="relative z-30 w-full flex flex-col justify-center items-center md:flex-row md:mr-10">
      <div class="hidden relative mr-8 md:block" style="width:280px;">
        <img class="absolute z-10 inline-block" style="top:-70px;left:85px;" src="@/assets/img/cube-logo.svg" alt="cube logo" />
        <div class="relative z-20">
          <h2 class="text-blue-100 text-2xl font-bold italic leading-none"><span class="text-3xl">J</span>OIN OUR COMMUNITY</h2>
          <h3 class="text-blue-100 text-base font-medium italic text-right leading-none">& beat your pb's!</h3>
        </div>
      </div>
      <Auth action="register" />
    </div>
  </div>
</template>

<script>
import Auth from '@/components/Auth'
export default {
  components: {
    Auth
  }
}
</script>

<style scoped>
@screen md{
  .midCube{
    top: 37%;
    left: 22%;
  }

  .leftCube{
    top: 55%;
    left: -7%;
    transform: rotate(270deg);
  }
}

@screen lg{
  .midCube{
    top: 37%;
    left: 29%;
  }

  .leftCube{
    top: 55%;
    left: 7%;
    transform: rotate(270deg);
  }
}

@screen xl{
  .midCube{
    top: 37%;
    left: 33%;
  }

  .leftCube{
    top: 55%;
    left: 15.7%;
    transform: rotate(270deg);
  }
}
</style>
