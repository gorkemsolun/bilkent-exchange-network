import {User} from "../models/user.js"
import jwt from "jsonwebtoken"

const createToken = (_id) => {
   return jwt.sign({_id}, "bununbirsecretolmasılazımnormalde", { expiresIn: '2d'})
}

//login user
export const loginUser = async (req, res) => {
   
    const { email, password } = req.body

    try{
        const user = await User.login(email, password)
        
        //Create a jwt
        const token = createToken(user._id)

        res.status(200).json({user, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

//signup user
export const signupUser = async (req, res) => {
    const {name, bilkentId, image, email, password} = req.body
    
    try {
        const user = await User.signup(name, bilkentId, image, email, password)

        //create a jwt 
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
