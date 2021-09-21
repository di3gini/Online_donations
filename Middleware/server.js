const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const axios = require('axios');


const app = express();

//midleware settings

//Limit petitions rate
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 200 // limit each IP to 100 requests per windowMs
  });


//middlewares
app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json())

  

app.get('/', async (req, res) => {
    res.send("Middleware online_donations");
});

app.get('/donations',  async (req, res) => {
    const body = req.body
    await axios.get('http://localhost:8080/api/donation/donations').then(response => {
           res.status(200).send(response.data)
       }).catch(error => {
           console.log(error);
           res.sendStatus(500);
       })
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running");
});