/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return {
            fallback: [
                //跨域接口请求 -> 前缀带上 /manage/
                {
                    source: "/manage/:path*",
                    destination: `http://test.api.yunyikang.net/manage/:path*`,
                },
            ],
        };
    },
    experimental: {
        outputStandalone: true,
        images: {
            unoptimized: true,
        },
    },
};

module.exports = nextConfig;
