require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./models/index');
const customerRoutes = require('./routes/customer.routes');
const productRoutes = require('./routes/product.routes');
const subscriptionRoutes = require('./routes/subscription.routes')
const app = express();

app.use(express.json())


app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/customers',customerRoutes);
app.use('/api/products',productRoutes);
app.use('/api/subscription',subscriptionRoutes);

db.sequelize.sync().then(() => {
   const PORT = process.env.PORT || 8000;
   app.listen(PORT,() => {
       console.log(`Server is running on port ${PORT}`)
   });
});