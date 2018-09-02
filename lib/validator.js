'use strict'

const BOOLEAN_VALUES = ['true', 'false']

function validate (varName, value, type) {
  switch (type) {
    case Number:
      if (isNaN(Number(value))) {
        throw new TypeError(`Expected number value for ${varName}`)
      }
      break

    case Boolean:
      if (!BOOLEAN_VALUES.includes(value)) {
        throw new TypeError(`Expected boolean value for ${varName}`)
      }
      break

    default:
      // String
      break
  }
}

module.exports.load = function load ({ prefix = '', schema = {} }) {
  for (let varName in schema) {
    const envName = prefix + varName
    const { type = String, required = true } = schema[varName]

    if (required && !process.env.hasOwnProperty(envName)) {
      throw Error(`Missing ${envName} environment variable`)
    }

    validate(varName, process.env[envName], type)
  }

  return true
}
