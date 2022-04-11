var fastify = require('fastify')({ logger: true });

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* GET home page. */
fastify.get('/', function (req, res, next) {
  return { success: true };
});

fastify.get('/definedLatency/:latency', async function (req, res, next) {
  const latency = req.params.latency;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(parseInt(latency)); /// waiting 1 second.
  return { success: true, latency: latency };
});

fastify.get('/randomLatency', async function (req, res, next) {
  const min = 200;
  const max = 5000;
  const rndInt = randomIntFromInterval(min, max);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(parseInt(rndInt)); /// waiting 1 second.
  return { success: true, latency: rndInt };
});

fastify.listen(3000, '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
