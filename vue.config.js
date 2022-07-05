// // vue.config.js
module.exports = {

  //部署应用包时的基本 URL
  publicPath: './',

  //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'dist',

  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: './assets',

  // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  lintOnSave: false,

  //是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
  runtimeCompiler: true,

  // 生产环境是否生成 sourceMap 文件 sourceMap的详解请看末尾
  productionSourceMap: false,

  devServer: {
    open: true,//服务启动时自动在浏览器打开
    //局域网访问
    host: '10.17.10.155', //host改成自己的IP
    port: 8080,//端口
    overlay: {
      warning: false,
      errors: false
    },
    proxy: {
      '/api': {
        target: 'http://10.17.10.109:8080', //后端接口地址
        changeOrigin: true, //是否允许跨越
        pathRewrite: {
          '^/api': '', //重写,
        }
      },
      '/server': {
        target: 'http://10.17.10.222:8080', //后端接口地址
        changeOrigin: true, //是否允许跨越
        pathRewrite: {
          '^/server': '', //重写,
        }
      },
    }
  },
}
