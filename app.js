const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const connect = require("./config/mongoose-connection");

const urlModel  =  require("./models/url")
// const client = require("./config/redisClient");

const urlRouter = require("./routers/urlRouter");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));

app.set("view engine", "ejs");


require("dotenv").config();
console.log('MONGO_URL from env:', process.env.MONGO_URL);

app.get("/", (req, res) =>{
    res.render("index",{shortUrl : null});
});

// async function start(){
//     await client.set("name", "vedant");

//     console.log(await client.get("name"))
// }
// start();

app.use("/url", urlRouter);

app.listen(PORT, () =>{
    console.log(`Server is running on port : ${PORT}`);
});



