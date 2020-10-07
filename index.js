const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
// const axios = require('axios');
const port = 3000;
// axios
// call 3005 (set up get request for bundle)
// http://localhost:3005/public/bundle

//app.use('/gallery', createProxyMiddleware({ target: 'http://localhost:3061', changeOrigin: true })); //express.static('/Users/jamesscolamieri/work/front-end-capstone/Image-Gallery/client/dist/bundle.js'))
app.use('/reservations',
  createProxyMiddleware({
    target: '127.0.0.1',
    changeOrigin: true,
    router: function() { return 'http://localhost:3005/public/bundle'}
  })); //express.static('/Users/jamesscolamieri/work/front-end-capstone/reservations/public/bundle'))
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

app.get('/reservations', )