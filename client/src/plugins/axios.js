import axiosHttp from 'axios'

export const axios = axiosHttp

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost/api/' : ''

export default {
  async install(Vue, { store }) {
    Vue.prototype.$axios = axiosHttp;

    axios.interceptors.request.use(async (config) => {
      if (await store.dispatch('auth/getJwtToken')) {
        config.headers.common['Authorization'] = 'Bearer ' + await store.dispatch('auth/getJwtToken')
      }
      return config;
    });

    await axios.interceptors.response.use(async response => {
      if (response.status === '401') {
        axios.get('/refresh', {
          headers: {
            'X-Refresh-Token': await store.dispatch('auth/getRefreshToken')
          }
        })
          .then(async refreshResponse => {
            await store.dispatch('auth/setJwtToken', refreshResponse.data.token);
            await store.dispatch('auth/setRefreshToken', refreshResponse.data.refreshToken);
          })
          .catch(function (error) {
            console.log(error);
            response.headers['Location'] = '/login';
          });
      }
      return response;
    });
  }
}
