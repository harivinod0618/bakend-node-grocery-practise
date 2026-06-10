const Admin = require("../models/Admin")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.adminRegister = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        const adminRecord = await Admin.findOne({email})

        if(adminRecord){
            return res.status(400).json({msg:"email already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            name, email, password:hashedPassword
        })
        return res.status(200).json({msg:"admin registered successful"})
        
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

    

}


exports.adminLogin = async(req, res)=>{
    try {
        const {email, password}=req.body;

        const adminRecord = await Admin.findOne({email});
        if(!adminRecord){
            return res.status(400).json({msg:"Invalid email "})
        }

        const adminpassword = await bcrypt.compare(password, adminRecord.password);
        if(!adminpassword){
            return res.status(410).json({msg:"inavlid password"})
        }

        const token = jwt.sign(
            {adminId:adminRecord._id}, process.env.JWT_SECRET_KEY, {expiresIn:"1d"}
        )

        return res.status(200).json({msg:"Admin login successfully", token})



    } catch (error) {
        return res.status(500).json({msg:error.message})
        
    }
    
}