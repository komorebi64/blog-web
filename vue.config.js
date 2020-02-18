/* 开发使用 代理 */
module.exports = {
  devServer: {
      proxy: {
          '/article':{
              target: 'http://956246.cn',
              changeOrigin: true
          }
      }
  }
};