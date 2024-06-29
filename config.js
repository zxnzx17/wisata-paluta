//CORS Configuration
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({
    target: 'https://160b-36-71-142-118.ngrok-free.app',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
}));

app.listen(3000, () => {
    console.log('Proxy server is running on http://localhost:3000');
});