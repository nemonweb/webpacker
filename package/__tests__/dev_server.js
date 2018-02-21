/* global test expect, describe */

const { chdirTestApp, chdirCwd } = require('../utils/helpers')

chdirTestApp()

describe('DevServer', () => {
  beforeEach(() => jest.resetModules())
  afterAll(chdirCwd)

  test('with development environment', () => {
    process.env.NODE_ENV = 'development'
    process.env.WEBPACKER_DEV_SERVER_HOST = '0.0.0.0'
    process.env.WEBPACKER_DEV_SERVER_PORT = 5000

    const devServer = require('../dev_server')
    expect(devServer).toBeDefined()
    expect(devServer.host).toEqual('0.0.0.0')
    expect(devServer.port).toEqual('5000')
  })

  test('with undefined environment', () => {
    delete process.env.NODE_ENV
    expect(() => require('../dev_server')).toThrow()
  })

  test('with production environment', () => {
    process.env.NODE_ENV = 'production'
    expect(require('../dev_server')).toEqual({})
  })
})
