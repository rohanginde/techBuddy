import mongoose from "mongoose";

//User schema containing specific fields
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    quiz:{
        type: Number,
        required: true
    },
    level:{
        type: String,
        required: true
    }
})
const User= mongoose.model("User", userSchema);
export default User;