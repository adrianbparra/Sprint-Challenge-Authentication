const router = require('express').Router();
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets");


const userDb = require("./auth-model.js")


router.post('/register', (req, res) => {
  // implement registration

  const creds = req.body;

  const hash = bycrypt.hashSync(creds.password, 12)

  creds.password = hash

  userDb.add(creds)
    .then(user =>{
      res.status(201).json(user)
    })
    .catch(err=> res.status(500).json({err, errorMessage: "Unable to register"}))

});

router.post('/login', (req, res) => {
  // implement login

  const {username, password} = req.body;


  userDb.findBy({username})
    .then(user =>{
      
      if(user && bycrypt.compareSync(password, user.password)){

        const token = generateToken(user)

        res.status(200).json({...user, token})

      } else {
        res.status(401).json({message: "Invalid Creds"})
      }
    })
    .catch(err=> res.status(500).json({err, errorMessage:"Unable to login"}))

});


function generateToken(user){
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: "12hrs"
  }

  return jwt.sign(payload,secrets.jwtSecret, options)

}
module.exports = router;
