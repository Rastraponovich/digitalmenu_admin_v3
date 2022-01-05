const path = require("path")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    // enabled: process.env.ANALYZE === "true" ,
    enabled: process.env.ANALYZE === "true",
})

const nextConfig = {
    images: {
        deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [8, 16, 32, 48, 64, 96, 128, 256, 384],
        domains: ["picsum.photos"],
    },

    webpack: (config, options) => {
        config.resolve.alias["@"] = path.resolve(__dirname)
        return config
    },

    reactStrictMode: true,
}
module.exports = withBundleAnalyzer(nextConfig)
