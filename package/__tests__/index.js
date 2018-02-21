/* global test expect, describe */

const { chdirTestApp, chdirCwd } = require('../utils/helpers')

chdirTestApp()

describe('Webpack config', () => {
  beforeEach(() => jest.resetModules())
  afterAll(chdirCwd)

  test('returns a development config', () => {
    process.env.NODE_ENV = 'development'
    const { environment } = require('../index')
    expect(environment.toWebpackConfig()).toMatchObject({
      devServer: {
        host: 'localhost',
        port: 3035
      }
    })
  })

  test('with no NODE_ENV throws an error', () => {
    delete process.env.NODE_ENV
    expect(() => require('../index')).toThrow()
  })

  test('returns a production config for non-standard env', () => {
    process.env.NODE_ENV = 'staging'
    const { environment } = require('../index')
    expect(environment.toWebpackConfig()).toMatchObject({
      devtool: 'nosources-source-map',
      stats: 'normal'
    })
  })
})
