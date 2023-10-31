
//importing components from respective files
import User from "../models/user.js";
import { JWT_SECRET } from "../../keys.mjs";
import jwt from 'jsonwebtoken';

//Middleware to verify if the user is logged in 
const requireLogin = (req, res, next) => {
    
    const token = req.headers['x-access-token']
    if(!token){
        
        res.status(401).json({error:"You must be logged in"})
    }
    
    jwt.verify(token, JWT_SECRET, (err, payload)=> {
        if(err){
            res.status(401).json({error:"You must be logged in"})
            return res.end();
        }

        //sending the user data through the request
        const {_id} = payload
        console.log(_id)
        User.findById(_id).then(userdata=>{
            console.log(userdata)
            req.user = userdata;
            next();
        })
    })
}

export default requireLogin;