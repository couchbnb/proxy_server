const express = require('express');
const router = express.Router();
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');

// serves index as static
router.use('/', express.static(path.join(__dirname, '../public')));


// ----- GALLERY ------
// had to remove reg ex and hardcode the id to get images to render

router.use('/bundle.js',
  createProxyMiddleware({
    target: '127.0.0.1',
    changeOrigin: true,
    router: function() { return 'http://localhost:3061/listing/:id' }
  })
);

router.use('/listing',
  createProxyMiddleware({
    target: '127.0.0.1',
    changeOrigin: true,
    router: function() { return 'http://localhost:3061/' }
  })
);

router.use('/data',
  createProxyMiddleware({
    target: '127.0.0.1',
    changeOrigin: true,
    router: function() { return 'http://localhost:3061/' }
  })
);


// ----- reservations ------

router.use('/reservations',
  createProxyMiddleware({
    target: '127.0.0.1',
    changeOrigin: true,
    router: function() { return 'http://localhost:3005/public/bundle' }
  })
);

router.use('/api/listing/',
  createProxyMiddleware({
    target: '127.0.0.1',
    changeOrigin: true,
    router: function() { return 'http://localhost:3005' }
  })
)

router.use('/api/reservations/',
  createProxyMiddleware({
    target: '127.0.0.1',
    changeOrigin: true,
    router: function() { return 'http://localhost:3005' }
  })
)



// ----- MORE PLACES TO STAY -----
// had to change main route for this component to static to get it to work

router.use('/static',
  createProxyMiddleware({
    target: '127.0.0.1',
    changeOrigin: true,
    router: function() { return 'http://localhost:1128/' }
  })
)

router.get('/place', (req, res) => {
  const id = req.query.roomid;
  axios.get(`http://localhost:1128/place?roomid=${id}`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
});


module.exports = router;