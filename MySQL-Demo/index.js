const express = require('express');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config()

const app = express();
app.use(bodyParser.json());

app.use('/api',userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT,() => {
    console.log(`server listening on ${PORT}`);
})




