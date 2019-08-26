const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const path = require('path')
// vue.config.js
module.exports = {
  // 对应html访问目标路径
  publicPath: '/myvue/',
  // build文件目录
  outputDir: 'dist',
  // 静态资源目录
  assetsDir: 'public',
  // 生成的index文件路径
  indexPath: 'index.html',
  // js文件名hash来控制缓存
  filenameHashing: true,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,
  // 生产环境 sourceMap
  productionSourceMap: false,
  // 配置高于chainWebpack中关于 css loader 的配置
  css: {
    // 是否开启支持 foo.module.css 样式
    modules: false,

    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中，开发环境让css实时生效就需要关闭
    extract: process.env.NODE_ENV === 'production',

    // 是否构建样式地图，false 将提高构建速度
    sourceMap: false,

    // css预设器配置项
    loaderOptions: {
      css: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.less$/,
            use: ['vue-style-loader', 'css-loader', 'less-loader'],
          }
        ]
        // options here will be passed to css-loader
      },
      postcss: {
        // options here will be passed to postcss-loader
      }
    }
  },

  // All options for webpack-dev-server are supported
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    open: true,

    host: '',

    port: 9050,

    https: false,

    hotOnly: false,

    proxy: null
  },
  configureWebpack: {
    plugins: [
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, './src/skeleton.js')
          }
        },
        minimize: true,
        quiet: true
      })
    ],
    externals: {
      "BMap": "BMap"
    }
  }
}
