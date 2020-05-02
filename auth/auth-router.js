const router = require('express').Router();
const bycrypt = require("bcryptjs");


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

  
});

module.exports = router;
