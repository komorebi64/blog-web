/* 开发使用 代理 */
module.exports = {
  devServer: {
      proxy: {
          '/article':{
              target: 'http://localhost:10888',
              changeOrigin: true
          },
          '/comment':{
              target: 'http://localhost:10888',
              changeOrigin: true
          }
      }
  }
};