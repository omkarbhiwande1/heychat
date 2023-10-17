const pool = require('../db');
module.exports.getTempChat = async (req,res)=>{
    try{
        const id = req.body.id;
        const uid = req.params.uid;

        text = "select username from users where userid=$1";
        let result = await pool.query(text,[id]);
        if(result.rows.length === 0 ){
            throw new Error("User Does not exist");
        }
        let sender = result.rows[0].username;

        text = "select username from users where userid=$1";
        result = await pool.query(text,[uid]);
        
        if(result.rows.length === 0 ){
            throw new Error("User Does not exist");
        }
        let reciever = result.rows[0].username;

        reciever = `%${reciever}%`
        sender = `%${sender}%`

        text = "select chatid from chats where chatidentity like $1 and chatidentity like $2";
        result = await pool.query(text,[sender,reciever]);
        
        let chatid = null;
        let isNew = false;

        let messages=[]
        if(result.rows.length === 0 ){
            isNew = true;
        
        }else{
            chatid = result.rows[0].chatid;
        }

        if(!isNew){
            text = "select * from messages where chatid=$1";
            result = await pool.query(text,[chatid]);
        }
        for(let i of result.rows){

            messages.push(i);
        }
        const data = {
            isNew,
            messages
        }

        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Somthing went wrong"});
    }
}

module.exports.sendTempChat = async (req,res)=>{
    try{
        const sender = req.body.id;
        const reciever = req.body.reciever;
        const messagetext = req.body.messageText; 
        // console.log(sender,reciever,messageText);
        text = "select username from users where userid=$1";
        let result = await pool.query(text,[sender]);
        if(result.rows.length === 0 ){
            throw new Error("User Does not exist");
        };
        let susername = result.rows[0].username;
        // console.log("1")
        text = "select username from users where userid=$1";
        result = await pool.query(text,[reciever]);
        if(result.rows.length === 0 ){
            throw new Error("User Does not exist");
        }
        let rusername = result.rows[0].username;
        // console.log("2")
        let chatIdentity = `${susername},${rusername}`;
        let chatid = null;
        
        rusername = `%${rusername}%`
        susername = `%${susername}%`
        
        text = "select chatid from chats where chatidentity like $1 and chatidentity like $2";
        result = await pool.query(text,[rusername,susername]);
        
        if(result.rows.length === 0 ){
            text = "insert into chats(chatidentity,messagecount) values($1,0) returning chatid";
            result = await pool.query(text,[chatIdentity]);
            chatid = result.rows[0].chatid;
            
        }else{
            chatid = result.rows[0].chatid;
        }
        // console.log("3")
        text = "insert into messages(messagetext, sender,reciever,chatid) values($1,$2,$3,$4)";
        result = await pool.query(text,[messagetext,sender,reciever,chatid]);
        // console.log("4")
        text = "update chats set messagecount = messagecount+1 where chatid=$1";
        result = await pool.query(text,[chatid]);

        

        
        res.status(200).json({sender, reciever, messagetext});

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Somthing went wrong"});
    }
}

module.exports.getConversations = async (req,res)=>{
    try{

        let text = "select username from users where userid=$1";
        let result = await pool.query(text,[req.body.id]);
        if(result.rows.length === 0 ){
            throw new Error("User Does not exist");
        };

        let username = result.rows[0].username;
        let qusername = `%${username}%`

        text = "select chatid,chatidentity from chats where chatidentity like $1 order by lastmessagetime desc";
        result = await pool.query(text,[qusername]);

        conversations=[]

        for(let i of result.rows ){
            let reciever = i.chatidentity.replace(username,'');
            reciever = reciever.replace(',','');

            text = "select userid from users where username=$1";
            result = await pool.query(text,[reciever]);
            let rid = result.rows[0].userid;

            // text = "select messageText, sender, reciever from messages where chatid=$1";
            // result1 = await pool.query(text,[i.chatid]);

            conversations.push(
                {
                    chatid: i.chatid,
                    rusername: reciever,
                    rid
                    // messages: result1.rows.length===0?[]:result1.rows
                }
            )
        };

        
        res.status(200).json(conversations);

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Somthing went wrong"});
    }
}

module.exports.sendChat = async (req,res)=>{
    try{
        

        const sender = req.body.id;
        const reciever = req.body.rid;
        const messagetext = req.body.messageText; 
        const currentChatIdentity = req.body.currentChatIdentity;

        text = "select username from users where userid=$1";
        let result = await pool.query(text,[sender]);
        if(result.rows.length === 0 ){
            throw new Error("User Does not exist");
        };
        let susername = result.rows[0].username;

        text = "select username from users where userid=$1";
        result = await pool.query(text,[reciever]);
        if(result.rows.length === 0 ){
            throw new Error("User Does not exist");
        }
        let rusername = result.rows[0].username;
        let finalrusername = rusername;
        let newChatIdentity = `${susername},${rusername}`;
        let chatid = null;
        
        rusername = `%${rusername}%`
        susername = `%${susername}%`
        
        text = "select chatid, chatidentity from chats where chatidentity like $1 and chatidentity like $2";
        result = await pool.query(text,[rusername,susername]);
        
        if(result.rows.length === 0 ){
            text = "insert into chats(chatidentity,messagecount) values($1,0) returning chatid,chatidentity";
            result = await pool.query(text,[newChatIdentity]);
            chatid = result.rows[0].chatid;
        }else{
            chatid = result.rows[0].chatid;
        }
        let chatIdentity = result.rows[0].chatidentity;
 
        text = "insert into messages(messagetext, sender,reciever,chatid) values($1,$2,$3,$4)";
        result = await pool.query(text,[messagetext,sender,reciever,chatid]);

        const lastMessageTime = Math.floor((Date.now())/1000);
        
        text = "update chats set messagecount = messagecount+1, lastmessagetime=$1 where chatid=$2";
        result = await pool.query(text,[lastMessageTime,chatid]);      
        
        res.status(200).json({sender, reciever, messagetext, chatid, rusername: finalrusername, chatidentity: chatIdentity, previousChatIdentity: currentChatIdentity});
        // res.status(200).json("Success");
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Somthing went wrong"});
    }
}

module.exports.getCurrentConversation = async (req,res)=>{
    try{
        const sid = req.body.id; 
        const rid = req.params.rid;
        const tchat = parseInt(req.params.tchat);
        // console.log(tchat);
        let text = "select username from users where userid=$1";
        let result = await pool.query(text,[sid]);
        if(result.rows.length === 0 ){
            throw new Error("User Does not exist");
        };

        let susername = result.rows[0].username;
        let qsusername = `%${susername}%`

        text = "select username from users where userid=$1";
        result = await pool.query(text,[rid]);
        if(result.rows.length === 0 ){
            throw new Error("User Does not exist");
        };

        let rusername = result.rows[0].username;
        let qrusername = `%${rusername}%`

        text = "select chatid,chatidentity from chats where chatidentity like $1 and chatidentity like $2";
        result = await pool.query(text,[qsusername, qrusername]);
        
        if(result.rows.length === 0 && tchat===0){
            throw new Error("Conversation does not exist");
        }
        let conversation = {
            sid,
            rid,
            susername,
            rusername,
            messages: []
        }
        
        if(result.rows.length === 0 && tchat===1){
            conversation.chatidentity = null;
            conversation.tchat = 1
            // console.log("Here");
        }

        if(result.rows.length !== 0 ){
            // console.log("Result has rows");
            conversation.chatidentity = result.rows[0].chatidentity;
            conversation.chatid = result.rows[0].chatid;
            text = "select messagetext,sender,reciever from messages where chatid=$1";
            result1 = await pool.query(text,[conversation.chatid]);
            for(let i of result1.rows){
                conversation.messages.push({messagetext: i.messagetext, sender: i.sender, reciever: i.reciever});
            }
            conversation.tchat = 0
        }
        // console.log(conversation);
        res.status(200).json(conversation);

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Somthing went wrong"});
    }
}