'use strict';

const config = require('./lib/configuration');

module.exports = function (customConfig) {

  config.override(customConfig);

  const manage = require('./lib/manage');

  return {manage};

};
