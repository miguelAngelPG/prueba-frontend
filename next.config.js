/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = { 
  env: { 
    SECRETWORD_SIGN: process.env.SECRETWORD_SIGN, 
  }, 
};