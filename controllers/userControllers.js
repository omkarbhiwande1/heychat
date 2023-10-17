const pool = require('../db');
module.exports.getUserData = async (req,res)=>{
    try{
        id = req.body.id;
        text = "select userid,username from users where userid=$1";
        let result = await pool.query(text,[id]);

        if(result.rows.length === 0 ){
            throw new Error("User Does not exist");
        }

        
        res.status(200).json(result.rows[0]);

    }catch(err){
        console.log(err);
        res.status(500).json({error:err.message, properties: err});
    }
}
module.exports.getSearchResults = async (req,res)=>{
    try{
        // console.log(req.body);
        let searchText = req.body.searchText;
        searchText = searchText.toLowerCase();
        let users = [];

        searchText = '%'+searchText+'%' 
        // console.log(req.body);
        text = "select userid,username from users where username like $1 and userid<>$2";
        const result = await pool.query(text,[searchText,req.body.id]);
        // console.log(result.rows);
        for(let i of result.rows){
            users.push(i);
        }

        res.status(200).json(users);

    }catch(err){
        console.log(err);
        res.status(500).json({error:err.message, properties: err});
    }
}