const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const app = express();

//midleware settings
const whitelist = ['http://localhost:3000', 'http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });


//middlewares
app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json())

  

app.get('/', async (req, res) => {
    res.send("Middleware aydrive");
});

app.post('/login',  async (req, res) => {
    const body = req.body
    await axios.post('https://reglogin-api-w27tl5imja-uc.a.run.app/api/user/login', body).then(response => {
           res.sendStatus(200);
       }).catch(error => {
           console.log(error);
           res.sendStatus(500);
       })
})

app.post('/register', async (req, res) => {
    const body = req.body
    await axios.post('https://reglogin-api-w27tl5imja-uc.a.run.app/api/user/save', body).then(response => {
           res.sendStatus(200);
       }).catch(error => {
           console.log(error)
           res.sendStatus(500);
       })
})

app.post('/api/createFile', async (req, res) => {
    const body = req.body
    await axios.post('https://3.134.93.176/createFile', body).then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error)
        res.sendStatus(500);
    })
})

app.post('/api/registerFile', async (req, res) => {
    const body = req.body
    await axios.post('https://3.134.93.176/createFile', body).then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error)
        res.sendStatus(500);
    })
})

app.put('/api/updateFile/:id', async (req, res) => {
    const body = req.params.id
    await axios.put('https://3.134.93.176/updateFile/' + req.params.id).then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error)
        res.sendStatus(500);
    })
})

app.post('/api/deleteFile', async (req, res) => {
    const body = req.body
    await axios.post('https://3.134.93.176/deleteFile', body).then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error)
        res.sendStatus(500);
    })
})

app.delete('/api/deleteRegister/:id', async (req, res) => {
    const body = req.params.id
    await axios.put('https://3.134.93.176/deleteRegister/' + req.params.id).then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error)
        res.sendStatus(500);
    })
})




app.listen(process.env.PORT || 8080, () => {
    console.log("Server running");
});