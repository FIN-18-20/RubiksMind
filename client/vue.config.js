module.exports = {
  chainWebpack: (config => {
    config
    .module
    .rule('svg')
    .use('file-loader')
    .tap(options => {
      options.name = 'svg/[name].[hash:8].[ext]'
      return options
    })
  })
}