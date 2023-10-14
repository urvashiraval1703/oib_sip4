const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const User = require("./models/userSchema");
const SECRET_KEY = 'secretkey'

app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});


//connect database
require("./config/database").connect();
//const cookieParser = require('cookie-parser');


//middleware
app.use(express.json());
app.use(cors());

//routes
app.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    console.log('Request body:', req.body);
    const hashedPassword = await bcrypt.hash(password, 5); 
    const newUser = new User({  email, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      message: 'User created successfully'
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({
      error: 'Error in sign up' 
    });
  }
});

//get registered users
app.get('/register',async(req,res)=> {
  try{
    const users = await User.find()
    res.status(201).json(users)
  }catch(error)
  {
    res.status(500).json({
      error:'Unable to get Users'
    })
  }
})

//get login
app.post('/login',async(req,res) => {
  try{
    const {username,password} = req.body
    const user = await User.findOne({username})
    if(!user){
      return res.status(401).json({error:'Invalid Credentials'})
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
      return res.status(401).json({error:'Invalid password'})
    }
    const token = jwt.sign({userId:user._id},SECRET_KEY,{expiresIn:'1hr'})
    res.json({message:'Login Successfully'})
  }
  catch(err)
  {
     res.status(500).json({error:'Error logging in'})
  }
})