import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

type UserPlayload ={
    id: Types.ObjectId
}

export const generateJWT =(payload: UserPlayload)=>{
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'})
    return token
}