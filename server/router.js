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

// router.use('/more-data',
//   createProxyMiddleware({
//     target: '127.0.0.1',
//     changeOrigin: true,
//     router: function() { return 'http://localhost:1128/' }
//   })
// )



// router.get('/place', (req, res) => {

//   axios.get(`http://localhost:1128/place?room_id=${req.query.roomid}`)
//     .then(function(response){
//       res.status(200)
//       res.json(response.data);
//     })
//     .catch(function(error){
//       console.log(error);
//       res.send(500);
//     })
// })

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


// router.get('/api/listing/', (req, res) => {
//   var queryString = `http://localhost:3005/api/listing/?listing_id=${req.query.listing_id}`
//   axios.get(queryString)
//     .then(function (response) {
//     res.send(response)
//     })
//     .catch(function (error) {
//       console.log(error);
//       res.sendStatus(500);
//     })
// })


// router.get('/gallery', (req, res) => {
//   res.bundle = {};
//   res.data = {};
//   axios.get('http://localhost:3061/listing/:id/bundle.js')
//     .then(function(response) {
//       res.send(response.data);
//     })
//     .catch(function(error) {
//       console.log(error);
//     })
// })
    // .then(
    //   axios.get('http://localhost:3061/data/55')
    //     .then(function(results) {
    //       // console.log(results);
    //       res.data = results.data;
    //       res.send(200);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //       res.send(500)
    //     })
    // )
    // .catch();

// request information from API;
// router.get('/more-data/, () => {
//   queryString = `http://localhost:3061/data/id=${id}`;
//   console.log(queryString);
//   res.send(200)
//   // axios.get()
// });
// // update is liked heart;
// // router.patch('/data/update', controller.updateLiked);



module.exports = router;