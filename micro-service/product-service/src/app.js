const express = require('express');
const axios = require('axios');

const app = express();
const port = 3002;

app.use(express.json());

const products = [
    { id: 1, name: 'Laptop', price: 1000, userId: 1 },
    { id: 2, name: 'Phone', price: 500, userId: 2 }
];

//get all products
app.get('/products',(req,res) => {
res.json(products);
});


//GET product by ID and get the owner from user service
app.get('/products/:id',async(req,res) => {
    const product = products.find(p =>p.id === parseInt(req.params.id));
    if(product) {
        try {
            const userRoutes = await axios.get(`http://localhost:3001/users/${product.userId}`);
            const owner = userRoutes.data;
            res.json({...product,owner});
        } catch(error) {
            res.status(500).send('Error fetching user information');
        }
    } else {
        res.status(404).send('Product not found');
    }
});



app.listen(port,() => {
    console.log(`Product Service listening at http://localhost:${port}`);
})