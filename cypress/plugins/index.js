/* eslint-disable */
const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');

module.exports = (on, config) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor);
  require('cypress-react-unit-test/plugins/react-scripts')(on, config);
  return config;
};
