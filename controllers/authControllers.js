const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const maxAge = 3*24*60*60;
const createToken=(id)=>{
    const token = jwt.sign({id},'A very good secret',{
        expiresIn: maxAge
    });
    return token;
}
module.exports.signup = async (req,res) =>{
    try{
        const {username, password} = req.body;
        const lowerUsername = username.toLowerCase();
        // console.log(username,password);
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        
        text = "insert into users(username,password) values($1,$2) RETURNING userid,username;"
        result = await pool.query(text,[lowerUsername,hashedPassword]);
        const id = result.rows[0].userid;
        const uname = result.rows[0].username;
        const token = createToken(id);

        res.status(200).json({token, username: uname, userid: id});

    }catch(err){
        let message = "Could not create user"; 
        if(err.code == 23505){
            message="username already exists"
        }
        res.status(500).json({message});
    }
}

module.exports.login = async (req,res)=>{
    try{
        // console.log("till here");
        const {username, password} = req.body;
        const lowerUsername = username.toLowerCase();
        text = "select userid,username,password from users where username=$1;"
        const result = await pool.query(text,[lowerUsername])
        if(result.rows.length === 0){
            throw new Error("username or email invalid");
        }
        // console.log(result.rows[0].password)
        const auth = await bcrypt.compare(password,result.rows[0].password);
        if(!auth){
            throw new Error("username or email invalid");
        }
  
        const token = createToken(result.rows[0].userid);
        res.status(200).json({token, username: result.rows[0].username, userid: result.rows[0].userid});
    }
    catch(err){
        // console.log(err);
        let message = "Error while logging in"; 
        if(err.code == 23505){
            message="username already exists"
        }
        else{
            message = err.message
        }
        
        res.status(500).json({message});
    }
}
