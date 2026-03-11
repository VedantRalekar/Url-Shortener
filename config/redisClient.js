const redis = require("redis");
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

const client = redis.createClient({
    url: `redis://${redisHost}:${redisPort}`
    // url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    // url : process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on("connect",()=>{
    console.log("Redis Connected..")
});

client.on("error", ()=>{
    console.log(error.message);
});

(async ()=>{
  try{
    await client.connect();
  } catch(err){
    console.log("Failed to connect redis..", err.message);
  }
})();


module.exports = client;

