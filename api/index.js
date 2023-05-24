const express = require("express")
const app = express()
const router = express.Router();

const cors = require('cors')
const cookieParser = require('cookie-parser')

const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth')

app.use(express.json())



app.use(express.urlencoded())









app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)
    next()
})

app.use(express.json())
app.use(cors(
    {
        origin:"http://localhost:4000",
    }
))
app.use(cookieParser())

app.use(bodyParser.urlencoded({extended:true}))

/*app.use('/',(req,res)=>{
    res.send("Hello World")

})*/

app.use("/auth",authRoutes)



app.listen(8800,()=>{
    console.log("API Working!")
});