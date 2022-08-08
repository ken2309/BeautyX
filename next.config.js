/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  async rewrites() {
    return [
      {
        source: '/team',
        destination: '/about',
      },
      {
        source: '/about-us',
        destination: '/about',
      },
      {
        source: '/cua-hang',
        destination: '/org'
      },
      {
        source: '/cua-hang/:org',
        destination: '/org/:org',
      },
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
