const Validator = require('../lib/validator.js')

module.exports = (api, { pluginOptions }) => {
  if (!pluginOptions.envValidator) {
    return
  }

  Validator.load(pluginOptions.envValidator)
}
