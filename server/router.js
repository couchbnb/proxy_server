const express = require('express');
const router = express.Router();
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');

// serves index as static
router.use('/', express.static(path.join(__dirname, '../public')));


// attempting to use proxy middleware to direct internal requests to outside servers

// router.use('/gallery',
//   createProxyMiddleware({
//     target: '127.0.0.1',
//     changeOrigin: true,
//     router: function() { return 'http://localhost:3061/listing/:id/bundle.js' }
//   })
// );

router.use('/reservations',
  createProxyMiddleware({
    target: '127.0.0.1',
    changeOrigin: true,
    router: function() { return 'http://localhost:3005/public/bundle' }
  })
);


router.get('/gallery', (req, res) => {
  res.bundle = {};
  res.data = {};
  axios.get('http://localhost:3061/listing/:id/bundle.js')
    .then(function(response) {
      res.bundle = response.data;
    })
    .catch(function(error) {
      console.log(error);
    })
    .then(
      axios.get('http://localhost:3061/data/55')
        .then(function(results) {
          // console.log(results);
          res.data = results.data;
          res.send(200);
        })
        .catch(function(error) {
          console.log(error);
          res.send(500)
        })
    )
    .catch()
})


module.exports = router;