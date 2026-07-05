const express = require("express");
const router = express.Router();

const urlModel = require("../models/url");
const shortid = require("shortid");
const redisClient = require("../config/redisClient");
const rateLimiter = require("../middlewares/rateLimiter");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/:shortCode", async function(req, res){
   const shortCode = req.params.shortCode;
   try {
        const cachedUrl = await redisClient.get(`short:${shortCode}`);
            if(cachedUrl){
                return res.redirect(cachedUrl); 
            }

            const urlDoc = await urlModel.findOne({ shortCode });
                if (!urlDoc) {
                    return res.status(404).send('Short URL not found');
                }
            //Store in Redis with 24h TTL
            await redisClient.setEx(`short:${shortCode}`,86400, urlDoc.longUrl);

           return  res.redirect(urlDoc.longUrl);
    } catch(error){
    
     console.log(error.message);
     return res.status(500).send("Server error..");
                
    }

       
});



router.post("/shorten",rateLimiter({windowSeconds: 60, maxRequests: 5, keyPrefix: 'rl'}), async function(req, res){
 
    const longUrl = req.body.longUrl;
    
    if(!longUrl) {
        return res.status(400).send('longUrl is required');
    }
    try{
        const existing = await urlModel.findOne({longUrl});
        const shortCode = shortid.generate();
    
        if(existing){
            await redisClient.setEx(`short:${existing.shortCode}`,86400, existing.longUrl);
            return res.render("index", {shortUrl : existing.shortCode });
        }


        
           while(await urlModel.exists({ shortCode })){
                shortCode = shortid.generate();
                }

            const  newurl = new urlModel({shortCode, longUrl});
            await newurl.save();
            
            await redisClient.setEx(`short:${shortCode}`, 86400, longUrl);
            return res.render("index", {shortUrl : shortCode })
    } catch(error){
        console.error('Create error:', error);
       return  res.status(500).send({ error: 'Server error' });
    }
});


module.exports = router;