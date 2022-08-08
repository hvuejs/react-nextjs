const isProd = process.env.NODE_ENV === "production";


function getBasePath() {
    var basePath = "";
    if (isProd) {
        basePath = "/react-nextjs"
    }

    return basePath;
}

// 域名二级目录配置
const homepage = {
    assetPrefix: getBasePath(), // 加前缀
    basePath: getBasePath(), 
    webpack(webpackConfig) {
        webpackConfig.output.publicPath = getBasePath() + webpackConfig.output.publicPath; //资源生成前缀
        return webpackConfig;
    },
    publicRuntimeConfig: {
        basePath: getBasePath(), //写入路径
    },
}


/** @type {import('next').NextConfig} */
const nextConfig = {
    ...homepage,
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
