/* global test expect, describe */

const { chdirTestApp, chdirCwd } = require('../utils/helpers')

chdirTestApp()

const error = `Using 'webpacker' requires that you specify 'NODE_ENV' environment variables.
    Valid values are default|development|test|production. Instead, received: undefined`

describe('Env', () => {
  beforeEach(() => jest.resetModules())
  afterAll(chdirCwd)

  test('returns set node environment', () => {
    process.env.NODE_ENV = 'development'
    expect(require('../env')).toEqual('development')
  })

  test('with no NODE_ENV throws an error', () => {
    delete process.env.NODE_ENV
    expect(() => require('../env')).toThrowError(error)
  })

  test('with non-standard environment', () => {
    process.env.NODE_ENV = 'foo'
    expect(require('../env')).toEqual('production')
  })
})
