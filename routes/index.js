var express = require('express');
var router = express.Router();

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/definedLatency/:latency', async function(req, res, next) {
  const latency = req.params.latency
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  await delay(parseInt(latency)) /// waiting 1 second.
  res.render('index', { title: 'Express' });
});

router.get('/randomLatency', async function(req, res, next) {
  const min = 200
  const max = 5000
  const rndInt = randomIntFromInterval(min, max)
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  await delay(parseInt(rndInt)) /// waiting 1 second.
  res.render('index', { title: 'Express' });
});

module.exports = router;
