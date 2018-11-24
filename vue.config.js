module.exports = {
    lintOnSave: true,
    css: {
      sourceMap: true,
      loaderOptions: {
        sass: {
          data: `
            @import "@/global.scss";
          `
        }
      }
    },
    devServer: {
      host: '0.0.0.0',
      hot: true,
      disableHostCheck: true,
    },
    productionSourceMap: false
  };
  