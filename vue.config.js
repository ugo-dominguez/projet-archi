module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    },
    css: {
      loaderOptions: {
        sass: {
          prependData: `@import "@/assets/styles/_variables.scss";`
        }
      }
    }
  }