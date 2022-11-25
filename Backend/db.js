const mongoose = require('mongoose')

const mongoURI="mongodb+srv://pratik:pratik@cluster0.6ucd66h.mongodb.net/notegenix?retryWrites=true&w=majority"
// code for connection to database
const connecttomongo =()=>{
    mongoose.connect(mongoURI, {

        useNewUrlParser: true, 
        
        useUnifiedTopology: true 
        
        }, err => {
        if(err) throw err;
        console.log('Connected to MongoDB!!!')
        });
}
module.exports=connecttomongo;