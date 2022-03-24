const express = require("express") 
const app = express()
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
// defining Port 
const PORT = 5000 || process.env.PORT


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// custom routes
app.use('/user', userRoutes)

// starting server
app.listen(PORT,(err) => {
    if(err) {
        console.log("err is error ", err);
        
    } else {
        console.log("server started");
    }
})