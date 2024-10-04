require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./models/index');
const router = require('./routes/index.routes');
const REST_API_PREFIX = require('./constant/routes.constant');
const app = express();

app.use(express.json())


app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(REST_API_PREFIX.REST_API_PREFIX.API,router);
db.sequelize.sync().then(() => {
   const PORT = process.env.PORT || 8000;
   app.listen(PORT,() => {
       console.log(`Server is running on port ${PORT}`)
   });
});