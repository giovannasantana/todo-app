const proxy = [
  {
    context: '/api',
    target: 'http://localhost:3000',
    pathRewrite: {'^/api' : ''},
    secure: false,
    changeOrigin: false
  }
];
module.exports = proxy;
