const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

const users = [
    {id:1,name: 'John',email: 'john@example.com'},
    {id:1,name: 'John',email: 'john@example.com'},
];


// GET all users
app.get('/users',(req,res) => {
    res.json(users);
})

//GET a users by ID
app.get('/users/:id',(req,res) => {
const user = users.find(u=>u.id === parseInt(req.params.id));
if(user) {
    res.json(user);
} else {
    res.status(404).send('User not found');
}    
});


app.listen(port,() => {
    console.log(`Server running on port ${port}`);
});

