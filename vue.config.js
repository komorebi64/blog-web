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
