const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/mern_batch2")
//mongoose.connect("mongodb://localhost:27017/mern_batch2")
.then(()=>{
    console.log("Connected to MongoDB Database")
})
.catch(()=>{
    console.log("Not Connected")
})