const Validator = require('../lib/validator.js')

/* global describe it expect */

describe('lib/validator.js', () => {
  describe('Arguments', () => {
    describe('prefix', () => {
      it('should load with default value', () => {
        process.env.TEST_HOST = 'localhost'

        expect(Validator.load({
          schema: {
            TEST_HOST: {
              required: true
            }
          }
        }))
      })

      it('should load with defined value', () => {
        process.env.VUE_APP_TEST_HOST = 'localhost'

        expect(Validator.load({
          prefix: 'VUE_APP_',
          schema: {
            TEST_HOST: {
              required: true
            }
          }
        }))
      })
    })

    describe('schema', () => {
      it('should load with default value', () => {
        expect(Validator.load({}))
      })

      it('should load with defined value', () => {
        process.env.TEST_HOST = 'localhost'

        expect(Validator.load({
          schema: {
            TEST_HOST: {
              required: true
            }
          }
        }))
      })
    })
  })

  describe('Required Value', () => {
    it('should throw an error for a missing environment variable', () => {
      expect(() => Validator.load({
        schema: {
          MISSING_ENV_NAME: {
            type: Number,
            required: true
          }
        }
      })).toThrowError(/Missing MISSING_ENV_NAME environment variable/)
    })

    describe('should load a required environment variable', () => {
      process.env.TEST_HOST = 'localhost'

      it('without type', () => {
        expect(Validator.load({
          schema: {
            TEST_HOST: {
              required: true
            }
          }
        }))
      })

      it('with missing type', () => {
        expect(Validator.load({
          schema: {
            TEST_HOST: {
              type: String,
              required: true
            }
          }
        }))
      })
    })
  })

  describe('Type Checking', () => {
    describe('Number', () => {
      const schema = {
        TEST_VAR_NUMBER: {
          type: Number
        }
      }

      it('should load an integer', () => {
        process.env.TEST_VAR_NUMBER = '123'

        expect(Validator.load({ schema }))
      })

      it('should load a float', () => {
        process.env.TEST_VAR_NUMBER = '123.4030'

        expect(Validator.load({ schema }))
      })

      it('should throw for an invalid number value', () => {
        process.env.TEST_VAR_NUMBER = '12h'

        expect(() => Validator.load({ schema }))
          .toThrowError(/Expected number value for TEST_VAR_NUMBER/)
      })
    })

    describe('Boolean', () => {
      const schema = {
        TEST_VAR_BOOL: {
          type: Boolean
        }
      }

      it('should load a truly value', () => {
        process.env.TEST_VAR_BOOL = 'true'

        expect(Validator.load({ schema }))
      })

      it('should load a falsly value', () => {
        process.env.TEST_VAR_BOOL = 'false'

        expect(Validator.load({ schema }))
      })

      it('should throw for an invalid boolean value', () => {
        process.env.TEST_VAR_BOOL = '0'

        expect(() => Validator.load({ schema }))
          .toThrowError(/Expected boolean value for TEST_VAR_BOOL/)
      })
    })
  })
})
