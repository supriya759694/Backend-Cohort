const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register user
exports.register = async(req,res)=>{
    console.log(req.body);
}