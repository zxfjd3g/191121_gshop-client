module.exports = {
  lintOnSave: false, // 直接关闭eslint检查
  // lintOnSave: 'warning', // 只是输出提示信息, 项目正常运行
  devServer: {
    proxy: {
      '/api': { // 只处理/api开头路径的请求
        target: 'http://182.92.128.115', // 转发的目标地址
        changeOrigin: true, // 支持跨域
        /* pathRewrite: {
          '^/api': ''
        } */
      }
    }
  }
}