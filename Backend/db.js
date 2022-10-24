const mongoose = require('mongoose')
const mongoURI="mongodb://localhost:27017/notebookdata"
// code for connection to database
const connecttomongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected - Have fun")
    })
}
module.exports=connecttomongo;