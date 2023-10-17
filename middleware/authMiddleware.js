// const { json } = require('express');
const jwt = require('jsonwebtoken');

const auth = (req,res,next) =>{
    let token = req.headers.authorization;
    // console.log("Token starting from here",token);
    
    // console.log(token);
    if(token){
        token = token.split("Bearer ")[1]
        jwt.verify(token,'A very good secret',(err, decodedToken)=>{
            if(err){
                res.status(500).json({message: "Could not authenticate"})
            }
            else{
                req.body.id = decodedToken.id;
                next();
            }
        });
    }
    else{
        res.status(500).json({message: "Could not authenticate"});
    }

}



module.exports = {auth}