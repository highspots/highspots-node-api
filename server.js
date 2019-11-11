const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4200;
const db = mongoose.connection;
const isDevelopment =  app.get('env') === 'development';

if (isDevelopment) {
    mongoose.connect(process.env.DEV_DATABASE, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });    
}

// Check connection
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function (err) {
    console.log(err);
});

app.listen(port, () => console.log(`Highspots APIs listening on port ${port}!`))