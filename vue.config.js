module.exports = {
    chainWebpack: (config) => {
      config.plugin("html").tap((args) => {
        args[0].title = " S2S Scheduling";
        return args;
      });
    },
    transpileDependencies: ["vuetify"],
    publicPath: "/",
  };