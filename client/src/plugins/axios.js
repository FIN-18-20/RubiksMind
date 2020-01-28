import axiosHttp from 'axios'

export const axios = axiosHttp

const baseUrl = 'http://localhost/'

const openRoutes = ['refresh', 'login', 'register']

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? baseUrl + 'api/' : ''

export default {
  async install(Vue, { store }) {
    Vue.prototype.$axios = axiosHttp

    axios.interceptors.request.use(async (config) => {
      if (await store.dispatch('auth/getJwtToken') && await store.dispatch('auth/getRefreshToken')) {
        config.headers.common['Authorization'] = 'Bearer ' + await store.dispatch('auth/getJwtToken')
        config.headers.common['X-Refresh-Token'] = await store.dispatch('auth/getRefreshToken')
      }
      return config
    })

    axios.interceptors.response.use(response => response, async error => {
      if (error.response.status === 401) {
        if (openRoutes.every(route => !error.response.config.url.includes(route))) {
          return await axios.get('/refresh')
            .then(async (refreshResponse) => {
              await store.dispatch('auth/setJwtToken', refreshResponse.data.token)
              await store.dispatch('auth/setRefreshToken', refreshResponse.data.refreshToken)

              error.config.headers['Authorization'] = 'Bearer ' + refreshResponse.data.token
              error.config.headers['X-Refresh-Token'] = refreshResponse.data.refreshToken
              return await axios.request(error.config)
            })
            .catch(error => {
              console.log('No refresh token : ' + error)
              store.commit('CHANGE_LOCAL_MODE', true)
              window.location.href = '/login'
            })
        }
      }
      return Promise.reject(error)
    })
  }
}
