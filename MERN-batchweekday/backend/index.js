const express = require('express')
const app = express()
const cors=require("cors");
const verifyToken=require("./middelware/verify");
var jwt = require('jsonwebtoken');
let jwtKey="Batch2";
const bcrypt=require("bcrypt");
app.use(cors())
const port=5000
///////connection file include
require("./db/conn");

///////Modal include
const Register=require("./Model/register");
app.use(express.json());
////////////insert////////////////////////
app.post("/register",async(req,res)=>{
    const{name,email,address,mobile,password,conpassword}=req.body
    if(name && email && address && mobile && password && conpassword){
        const userEmail=await Register.findOne({email});
        if(userEmail){
            res.send({"message":"ALready Registered with this email in Our Database"})
        }
        else{
            if(password===conpassword){
                const saltRounds=10;
                const salt = bcrypt.genSaltSync(saltRounds);
                const hashPass = bcrypt.hashSync(password, salt);
                const hashConPass = bcrypt.hashSync(conpassword, salt);
               let regis= new Register({name:name,email,address,mobile,password:hashPass,conpassword:hashConPass});
               let result=await regis.save();
                res.send({"message":result})
            }
            else{
                res.send({"message":"Your Password and confirm password is not match"})
            }
           
        }
       
    }
    else{
        res.send({"message":"All field is required."})
    }
});
///////////////////fetch api///////////////////

app.get('/fetchAll',verifyToken,async(req,res)=>{
    let fetchAllData= await Register.find({});
    if(fetchAllData.length>0)
    {
        res.send(fetchAllData)
    }
    else{
        res.send({result:"No data"})
    }
})



////////////delete////////////////
app.delete("/delete/:id",async(req,res)=>{
    let deleted=await Register.deleteOne({_id:req.params.id})
    res.send(deleted)
});

////////////get particular details////////
app.get("/update/:id",async(req,res)=>{
    let data=await Register.findOne({_id:req.params.id})
    res.send(data)
});

//////////update post//////////////////////////
app.put("/update/:id",async(req,res)=>{
   
    let data=await Register.updateOne(
        {_id:req.params.id},
        {$set:req.body}
        )
    res.send(data)
});

///////////login api////////////////

app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    if(email && password){
        const userEmail=await Register.findOne({email});
       console.log(userEmail)
     
        if(userEmail!=null)
        {
            const passMatch=bcrypt.compareSync(password, userEmail.password);
            if(userEmail.email===email && passMatch)
            {
                const token=jwt.sign({userEmail},jwtKey,{expiresIn:"1h"})
                res.send({"message":"Login Success",userEmail,token})
            }
            else{
                res.send({"message":"Your email or password is not match"})
            }
        }
        else{
            res.send({"message":"You are not registered User"})
        }
    }else{
        res.send({"message":"All Field is required"})
    }
})





app.listen(port,()=>{
    console.log(`App running on port ${port}`);
    console.log(`http://localhost:${port}`)
})