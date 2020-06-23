
module.exports = {
  //px转rem的配置（postcss-plugin-px2rem插件）
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
              rootValue: 75,
              exclude: /(node_module)/,
              mediaQuery: false,
              minPixelValue: 3
          })
        ]
      }
    }
  }
}