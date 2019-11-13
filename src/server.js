const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4200;
const dotenv = require('dotenv');
const db = mongoose.connection;
const isDevelopment =  app.get('env') === 'development';
const highSessions = require('./routes/high-session');
const authRoute = require('./routes/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');


dotenv.config();

mongoose.connect(
    isDevelopment ? process.env.DEV_DATABASE : process.env.MONGODB_URI, 
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
    () => console.log('Connected to MongoDB')
);

// // Check connection
// db.once('open', function () {
//     console.log('Connected to MongoDB');
// });

// // Check for DB errors
// db.on('error', function (err) {
//     console.log(err);
// });

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Body Parser Middleware
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Add Headers / CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Route Middlewares
app.use('/api/user', authRoute);

// Routes
app.use('/high-sessions', highSessions);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})

app.listen(port, () => console.log(`Highspots APIs listening on port ${port}!`))