/** @type {import('next').NextConfig} */
const nextConfig = { 
  eslint : {
    ignoreBuildErrors : true
},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      
      },
    ],
  },
}

module.exports = nextConfig

