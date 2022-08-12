/** @type {import('next').NextConfig} */
const { i18n } = require('./i18n.config')
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  i18n,
  async rewrites() {
    return [
      {
        source: '/MOMO',
        destination: '/'
      },
      {
        source: '/TIKI',
        destination: '/'
      },
      {
        source: '/MBBANK',
        destination: '/'
      },
      {
        source: '/MOMO/:data',
        destination: '/'
      },
      {
        source: '/TIKI/:data',
        destination: '/'
      },
      {
        source: '/MBBANK/:data',
        destination: '/'
      },


      {
        source: '/cua-hang',
        destination: '/org'
      },
      //org detail
      {
        source: '/vi/cua-hang/:org',
        destination: '/vi/org/:org',
        locale: false
      },
      {
        source: '/en/org/:org',
        destination: '/en/org/:org',
        locale: false
      },
      //------
      {
        source: '/:service_name',
        has: [
          {
            type: 'query',
            key: 'ser_id',
            value: '(?<cmsId>.*)'
          }
        ],
        destination: '/services',
      },
      {
        source: '/:service_name',
        has: [
          {
            type: 'query',
            key: 'pro_id',
            value: '(?<cmsId>.*)'
          }
        ],
        destination: '/products',
      },
    ]
  },
}
