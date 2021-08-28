const { environment } = require("@rails/webpacker");

// to fix the postcss loader issue
environment.loaders.keys().forEach((loaderName) => {
  let loader = environment.loaders.get(loaderName);
  loader.use.forEach((loaderConfig) => {
    if (loaderConfig.options && loaderConfig.options.config) {
      loaderConfig.options.postcssOptions = loaderConfig.options.config;
      delete loaderConfig.options.config;
    }
  });
});
// postcsss loader issue end

module.exports = environment;
