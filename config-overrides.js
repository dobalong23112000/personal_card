
const path = require('path')
const rewireAliases = require('react-app-rewire-aliases')

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config = rewireAliases.aliasesOptions({
        '@src': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@routers': path.resolve(__dirname, 'src/routers'),
        '@services': path.resolve(__dirname, 'src/services'),


       
      })(config, env)
    
    config.resolve.fallback = {
        "fs": false,
        path: require.resolve('path-browserify'),
    };
    return config;
  }