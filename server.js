const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const devProxy = {
    '/manage': {
        target: 'http://test.api.yunyikang.net/', // 端口自己配置合适的
        changeOrigin: true
    },
    // '/manage': {
    //     target: '', // 端口自己配置合适的
    //     changeOrigin: true
    // }
}

app.prepare().then(() => {
    const server = express();

    if (dev && devProxy) {
        Object.keys(devProxy).forEach(function(context) {
            server.use(createProxyMiddleware(context, devProxy[context]))
        })
    }


    // server.use(
    //     '/manage',
    //     createProxyMiddleware({
    //         target: "http://test.api.yunyikang.net/",
    //         changeOrigin: true,
    //     }),
    // );

    server.all('*', (req, res) => handle(req, res));

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
}).catch(err => {
    console.log(err);
})
