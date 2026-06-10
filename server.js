const express = require("express")
const mongoose = require("mongoose")
const dotEnv = require("dotenv")
const adminRoute = require("./routes/adminRoute")
const cors = require("cors");
const app = express()


app.use(cors());




dotEnv.config()

app.use(express.json());

// console.log("checking  ",process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Data base connected successfully!!!!!!")
})

.catch((error)=>{
    console.log(error.message)

})


app.use("/admin", adminRoute);
app.get("/", (req, res) => {
    res.send("Server is running...");
});

 const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running at @${PORT}`)
})