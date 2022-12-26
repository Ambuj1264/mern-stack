var jwt = require('jsonwebtoken');
let jwtKey="Batch2";
function verifyToken(req,res,next)
{
    let token=req.headers["authorization"];
    if(token){
        //token=token.split(" ")[1];
        console.log("middelware called",token);
        jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                res.send({result:"No token is provided"});
            }
            else{                             
                next();
            }
        })
    }
    else{
        res.send({result:"plz add token with header"});
    }
    
}     
module.exports=verifyToken