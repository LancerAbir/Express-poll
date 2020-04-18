/**
*! -*-*-*-*-*-*- Import Modules Function & File Start -*-*-*-*-*-*-
*/

// import express
const express = require('express');

// import User Route file
const pollRouter = require('./routes/pollRoute')

// import Mongoose
const mongoose = require('mongoose');

// import Morgan
const morgan = require('morgan')

// import bodyParser {third party modules --> data pass করার জন্য use হয়}
const bodyParser = require('body-parser')

// import cors {third party modules --> 2/একাধিক server কে request করার system হল cors }
const cors = require('cors')
/**
//* -*-*-*-*-*-*- Import Modules Function & File End -*-*-*-*-*-*-
*/



// express define in app variable 
const app = express()


/**
*! -*-*-*-*-*-*-*-*-*- View Engine Change করে EJS set করা Start-*-*-*-*-*-*-*-*-*-
*/
app.set('view engine', 'ejs')
/**
//* -*-*-*-*-*-*-*-*-*- View Engine Change করে EJS set করা  End -*-*-*-*-*-*-*-*-*-



/**
*! -*-*-*-*-*-*-*-*-*- Custom Create Modules Start ( কি কি data আমার received করতে পারবো )-*-*-*-*-*-*-*-*-*-
*/
// Urlencoded Data --> form data
app.use(express.urlencoded({ extended: true }))
// Json Data
app.use(express.json())
/**
//* -*-*-*-*-*-*-*-*-*- Custom Create Modules End -*-*-*-*-*-*-*-*-*-



/**
*! -*-*-*-*-*-*-*-*-*- Third Party Modules (BodyParser) Start -*-*-*-*-*-*-*-*-*-
*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
/**
//* -*-*-*-*-*-*-*-*-*- Third Party Modules (BodyParser) End -*-*-*-*-*-*-*-*-*-



/**
*! -*-*-*-*-*-*-*-*-*- Third Party Modules (Cors) Start -*-*-*-*-*-*-*-*-*-
*/
// Cors Modules
app.use(cors())
/**
//* -*-*-*-*-*-*-*-*-*- Third Party Modules (Cors) End -*-*-*-*-*-*-*-*-*-
*/


/**
*! -*-*-*-*-*-*-*-*-*- Set Third Party Modules (Morgan) Start -*-*-*-*-*-*-*-*-*-
*/
// morgan set
app.use(morgan('dev'))
/**
//* -*-*-*-*-*-*-*-*-*- Set Third Party Modules (Morgan) End -*-*-*-*-*-*-*-*-*-



/**
*! -*-*-*-*-*-*-*-*-*- api Directory Route/Path Start -*-*-*-*-*-*-*-*-*-
*/
// example.com/api/createPoll --> path add in other file
app.use('/poll/createPoll', pollRouter)
/**
//* -*-*-*-*-*-*-*-*-*- api Directory Route/Path End -*-*-*-*-*-*-*-*-*-
*/



/**
*! -*-*-*-*-*-*-*-*-*- Home Directory Route/Path Start -*-*-*-*-*-*-*-*-*-
*/
app.get('/about', (req, res) => {
    res.send(`<h1>HELLO this is About page</h1>`)
})

app.get('/contact', (req, res) => {
    res.send(`<h1>HELLO this is contact page</h1>`)
})

app.get('/blog', (req, res) => {
    res.json({
        message: "this is json data come form blog page"
    })
})

app.get('/', (req, res) => {
    res.send(`<h1> this is Home Page</h1>`)
})

app.get('*', (req, res) => {
    res.send(`<h1> this is 404 ERROR page</h1>`)
})
/**
//* -*-*-*-*-*-*-*-*-*- Home Directory Route/Path End -*-*-*-*-*-*-*-*-*-
*/



/**
*! -*-*-*-*-*-*-*-*-*- process.env --> কোন environment / লিংক এ ওপেন হবে তা বোঝায় -*-*-*-*-*-*-*-*-*-
*/
const PORT = process.env.PORT || 5050
/**
//* -*-*-*-*-*-*-*-*- process.env End -*-*-*-*-*-*-*-*-  
*/




/**
*! -*-*-*-*-*-*-*-*-*- Mongoose Start -*-*-*-*-*-*-*-*-*-
*/
// Mongoose connection {dede-db --> database name}
mongoose.connect(`mongodb+srv://MongoSuper5:MongoSuper5@cluster0-0evig.mongodb.net/express-cc?retryWrites=true&w=majority`, {
    useNewUrlParser: true
})
    .then(() => {
        /** 
        *! app.listen --> PORT 
        */
        app.listen(PORT, () => {
            console.log(`Server is Running on PORT ${PORT}`);
        })
    })
    .catch(err => {
        console.log(err)
    })

// check Mongoose connection is or not ?
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log('Database Connection Established');
})
/**
//* -*-*-*-*-*-*-*-*-*- Mongoose End -*-*-*-*-*-*-*-*-*-
*/