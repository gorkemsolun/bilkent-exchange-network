import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    bilkentId: {
      type: Number,
      required: true,
      unique: true
    },
    image: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true
  }
);

//signup method
UserSchema.statics.signup = async function(name, bilkentId, image, email, password){
    
    if (!email || !password || !name || !bilkentId) {
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)) {
        throw Error("Invalid Email")
    }
    
    //check if email exists
    const emailExists = await this.findOne({email})

    if (emailExists) {
        throw Error("Email already in use")
    }


    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({name, bilkentId, image:"", email, password: hash})

    return user
}


export const User = mongoose.model("User", UserSchema);