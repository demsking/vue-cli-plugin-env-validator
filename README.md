# Vue CLI Env Validator Plugin

A Vue CLI Plugin to validate Environment Variables with type checking and required behavior.

[![npm](https://img.shields.io/npm/v/vue-cli-plugin-env-validator.svg)](https://www.npmjs.com/package/vue-cli-plugin-env-validator) [![Build status](https://gitlab.com/demsking/vue-cli-plugin-env-validator/badges/master/build.svg)](https://gitlab.com/demsking/vue-cli-plugin-env-validator/commits/master) [![Test coverage](https://gitlab.com/demsking/vue-cli-plugin-env-validator/badges/master/coverage.svg)](https://gitlab.com/demsking/vue-cli-plugin-env-validator/pipelines)

## Install

```sh
vue add env-validator
```

## Usage

```js
// vue.config.js

module.exports = {
  pluginOptions: {
    envValidator: {
      schema: {
        VUE_APP_FIREBASE_API_KEY: {
          type: String,
          required: true
        },
        VUE_APP_FIREBASE_AUTH_DOMAIN: {
          type: String,
          required: true
        },
        VUE_APP_FIREBASE_DATABASE_URL: {
          type: String,
          required: true
        },
        VUE_APP_FIREBASE_PROJECT_ID: {
          type: String,
          required: true
        }
      }
    }
  }
}
```

## Usage with a prefix

```js
// vue.config.js

module.exports = {
  pluginOptions: {
    envValidator: {
      prefix: 'VUE_APP_',
      schema: {
        FIREBASE_API_KEY: {
          type: String,
          required: true
        },
        FIREBASE_AUTH_DOMAIN: {
          type: String,
          required: true
        },
        FIREBASE_DATABASE_URL: {
          type: String,
          required: true
        },
        FIREBASE_PROJECT_ID: {
          type: String,
          required: true
        }
      }
    }
  }
}
```

## License

Under the MIT license. See [LICENSE](https://gitlab.com/demsking/vue-cli-plugin-env-validator/blob/master/LICENSE) file for more details.
