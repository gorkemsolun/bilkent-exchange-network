import {User} from "../models/user.js"


//login user
export const loginUser = async (req, res) => {
   
    
}

//signup user
export const signupUser = async (req, res) => {
    const {name, bilkentId, image, email, password} = req.body
    
    try {
        const user = User.signup(name, bilkentId, image, email, password)
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
