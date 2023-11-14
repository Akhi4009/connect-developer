const express=require('express')
const connection=require("./db")
const app=express()
app.get("/",(req,res)=>res.send('API running'))
const PORT=process.env.PORT || 5000

app.listen(PORT,async()=>{
try{
    await connection;
    console.log("connected to db")
}catch(err){
    console.log({"msg":"not connected to database","error":err.message})
}
 console.log(`Server started on port ${PORT}`)
})