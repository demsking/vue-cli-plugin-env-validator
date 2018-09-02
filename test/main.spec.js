const Validator = require('../lib/validator.js')

/* global describe it expect */

describe('lib/validator.js', () => {
  describe('Required Value', () => {
    it('should throw an error for a missing environment variable', () => {
      expect(() => Validator.load({
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
        expect(Validator.load({
          TEST_HOST: {
            required: true
          }
        })).toEqual(expected)
      })

      it('with missing type', () => {
        expect(Validator.load({
          TEST_HOST: {
            type: String,
            required: true
          }
        })).toEqual(expected)
      })
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

        expect(Validator.load({
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

        expect(Validator.load({
          TEST_X: {
            type: Number
          }
        })).toEqual(expected)
      })

      it('should throw for an invalid number value', () => {
        const ENV_VALUE = '12h'

        process.env[ENV_NAME] = ENV_VALUE

        expect(() => Validator.load({
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

        expect(Validator.load({
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

        expect(Validator.load({
          TEST_X: {
            type: Boolean
          }
        })).toEqual(expected)
      })

      it('should throw for an invalid boolean value', () => {
        const ENV_VALUE = '0'

        process.env[ENV_NAME] = ENV_VALUE

        expect(() => Validator.load({
          TEST_X: {
            type: Boolean
          }
        })).toThrowError(/Expected boolean value for TEST_X/)
      })
    })
  })
})
