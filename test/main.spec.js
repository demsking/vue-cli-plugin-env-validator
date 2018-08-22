import VueAppEnv from '..'

/* global describe it process expect */

describe('lib/main.js', () => {
  describe('Required Value', () => {
    it('should throw an error for a missing environment variable', () => {
      expect(() => VueAppEnv.get({
        MISSING_ENV_NAME: {
          type: Number,
          required: true
        }
      })).toThrowError(/Missing VUE_APP_MISSING_ENV_NAME environment variable/)
    })

    describe('should load a required environment variable', () => {
      process.env.VUE_APP_TEST_HOST = 'localhost'

      const expected = {
        TEST_HOST: 'localhost'
      }

      it('without type', () => {
        expect(VueAppEnv.get({
          TEST_HOST: {
            required: true
          }
        })).toEqual(expected)
      })

      it('with missing type', () => {
        expect(VueAppEnv.get({
          TEST_HOST: {
            type: String,
            required: true
          }
        })).toEqual(expected)
      })
    })
  })

  describe('Default Value', () => {
    it('should load a required environment variable', () => {
      const expected = {
        TEST_DEFAULT_HOST: 'localhost'
      }

      expect(VueAppEnv.get({
        TEST_DEFAULT_HOST: {
          default: 'localhost'
        }
      })).toEqual(expected)
    })

    it('should load missing default value', () => {
      const config = VueAppEnv.get({
        TEST_DEFAULT_MISSING_X: {
          type: String
        }
      })

      const expected = {
        TEST_DEFAULT_MISSING_X: undefined
      }

      expect(config).toEqual(expected)
    })
  })

  describe('Name Mapping', () => {
    it('should successfully load with a name mapping', () => {
      const expected = {
        hostname: 'localhost'
      }

      expect(VueAppEnv.get({
        TEST_DEFAULT_HOST: {
          name: 'hostname',
          default: 'localhost'
        }
      })).toEqual(expected)
    })
  })

  describe('Type Checking', () => {
    describe('Number', () => {
      const ENV_NAME = 'VUE_APP_TEST_X'

      it('should load an integer', () => {
        const ENV_VALUE = '123'
        const expected = {
          TEST_X: 123
        }

        process.env[ENV_NAME] = ENV_VALUE

        expect(VueAppEnv.get({
          TEST_X: {
            type: Number
          }
        })).toEqual(expected)
      })

      it('should load a float', () => {
        const ENV_VALUE = '123.4030'
        const expected = {
          TEST_X: 123.403
        }

        process.env[ENV_NAME] = ENV_VALUE

        expect(VueAppEnv.get({
          TEST_X: {
            type: Number
          }
        })).toEqual(expected)
      })

      it('should throw for an invalid number value', () => {
        const ENV_VALUE = '12h'

        process.env[ENV_NAME] = ENV_VALUE

        expect(() => VueAppEnv.get({
          TEST_X: {
            type: Number
          }
        })).toThrowError(/Expected number value for TEST_X/)
      })
    })

    describe('Boolean', () => {
      const ENV_NAME = 'VUE_APP_TEST_X'

      it('should load a truly value', () => {
        const ENV_VALUE = 'true'
        const expected = {
          TEST_X: true
        }

        process.env[ENV_NAME] = ENV_VALUE

        expect(VueAppEnv.get({
          TEST_X: {
            type: Boolean
          }
        })).toEqual(expected)
      })

      it('should load a falsly value', () => {
        const ENV_VALUE = 'false'
        const expected = {
          TEST_X: false
        }

        process.env[ENV_NAME] = ENV_VALUE

        expect(VueAppEnv.get({
          TEST_X: {
            type: Boolean
          }
        })).toEqual(expected)
      })

      it('should throw for an invalid boolean value', () => {
        const ENV_VALUE = '0'

        process.env[ENV_NAME] = ENV_VALUE

        expect(() => VueAppEnv.get({
          TEST_X: {
            type: Boolean
          }
        })).toThrowError(/Expected boolean value for TEST_X/)
      })
    })
  })
})
