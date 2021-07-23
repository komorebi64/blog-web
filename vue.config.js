/* 开发使用 代理 */
module.exports = {
  devServer: {
    port: 8888,
    disableHostCheck: true,
    /*proxy: {
          '/article':{
              target: 'http://localhost:10888',
              changeOrigin: true
          },
          '/comment':{
              target: 'http://localhost:10888',
              changeOrigin: true
          },
          '/toQQLogin':{
              target: 'http://localhost:10888',
              changeOrigin: true
          },
          '/oauth2':{
              target: 'http://localhost:10888',
              changeOrigin: true
          },
          '/logout':{
              target: 'http://localhost:10888',
              changeOrigin: true
          },
          '/auth':{
              target: 'http://localhost:10888',
              changeOrigin: true
          }
      }*/
  },
  chainWebpack(config) {
    // 移除 preload 插件
    config.plugins.delete('preload')
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    //config.plugins.delete('preload-${name}')//可配置移除预加载的页面。eg:login.html则添加config.plugins.delete('preload-login'),
  },
  pages:{
    index:{
      entry: 'src/pages/index/main.js',
      template: 'public/index.html'
    },
    admin:{
      entry: 'src/pages/admin/main.js',
      template: 'public/index.html',
      filename: 'admin'
    }
  }
};
