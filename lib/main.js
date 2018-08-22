'use strict'

/* global process */

const prefix = 'VUE_APP_'

function rename (varName) {
  return prefix + varName
}

const BOOLEAN_VALUES = ['true', 'false']

function parse (varName, value, type) {
  switch (type) {
    case Number:
      if (isNaN(Number(value))) {
        throw new TypeError(`Expected number value for ${varName}`)
      }
      return parseFloat(value)

    case Boolean:
      if (!BOOLEAN_VALUES.includes(value)) {
        throw new TypeError(`Expected boolean value for ${varName}`)
      }
      return value === 'true'

    default:
      return value
  }
}

function value (varName, envName, type, defaultValue = undefined) {
  const val = parse(varName, process.env[envName], type)

  if (val === undefined && defaultValue !== undefined) {
    return defaultValue
  }

  return val
}

export default class VueAppEnv {
  static get (def) {
    const config = Object.keys(def).reduce((values, varName) => {
      const envName = rename(varName)
      const { type = String, name = varName, required = false } = def[varName]

      if (required && !process.env.hasOwnProperty(envName)) {
        throw Error(`Missing ${envName} environment variable`)
      }

      values[name] = value(varName, envName, type, def[varName].default)

      return values
    }, {})

    return Object.freeze(config)
  }
}
