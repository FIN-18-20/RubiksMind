import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      guest: true,
      hasConnection: true
    }
  },
  {
    path: '/',
    name: 'play',
    component: () => import(/* webpackChunkName: "play" */ '../views/Play.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: {
      guest: true,
      hasConnection: true
    }
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: () => import(/* webpackChunkName: "leaderboard" */ '../views/Leaderboard.vue'),
    meta: {
      hasConnection: true
    }
  },
  // {
  //   path: '/oauth-connection-successfull/:provider?',
  //   name: 'oauth-connection-successfull',
  //   component: () => import(/* webpackChunkName: "oauth-connection-successfull" */ '../views/OAuthConnectionSuccessfull.vue'),
  //   props: true
  // },
  {
    path: '/profile/:username',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    meta: {
      hasConnection: true
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwtToken') === null && localStorage.getItem('refreshToken') === null) {
      next()
    } else {
      next('/')
    }
    // TODO check connection to redirect
  } else {
    next()
  }
})

export default router
