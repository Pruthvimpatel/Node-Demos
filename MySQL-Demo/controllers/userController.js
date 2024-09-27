const User = require("../models/userModel");


exports.createUser = (req,res)=> {
    const {firstName,lastName,gender} = req.body;
    User.create({ firstName, lastName, gender }, (err, userId) => {
        if (err) return res.status(500).json({ error: 'Failed to create user' });
        res.json({ message: 'User created', id: userId });
      });
};

exports.getAllUsers = (req,res) => {
    User.getAll((err,users)=> {
        if(err) return res.status(500).json({error: 'Failed  to fetch Users'})
            res.json(users)
    });
};


exports.getUserById = (req,res) => {
    const {id} = req.params;
    User.getById(id,(err,user) => {
        if(err) return res.status(500).json({error: 'Failed to fetch users'});
        if(!user) return res.status(404).json({message: 'User not found'});
        res.json(user);
    });
};

exports.updateUser = (req,res) => {
    const {id} = req.params;
    const {firstName,lastName,gender} = req.body;
    User.update(id,{firstName,lastName,gender},(err) => {
        if(err) return res.status(500).json({error: 'Failed to update'});
    });
};

exports.deleteUser = (req,res) => {
    const {id} = req.params;

    User.delete(id,(err) => {
        if(err) return res.status(500).json({error: 'Failed to deleteUser'});
        res.json({message: 'User deleted'})
    })
};