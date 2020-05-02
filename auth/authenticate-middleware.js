/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken");
const secrets =require("../config/secrets");

module.exports = (req, res, next) => {

  try{
    const token = req.headers.authorization;

    if(token){
      jwt.verify(token,secrets.jwtSecret,(err,decodedToken) =>{
        if(err){
          throw new Error(err)
        } else {
          req.decodedToken = decodedToken
          next()
        }
      })
    } else {
      throw new Error("Not authorized")
    }


  } catch(err) {
    res.status(401).json({ you: 'shall not pass!', error: err.message });
  }
  
};
