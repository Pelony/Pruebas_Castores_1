import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends Document{
    email:string
    password:string
    name:string
    lastName:string
    user:string
    confirmed:boolean
}

const userSchema: Schema = new Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    confirmed:{
        type:Boolean,
        default:false
    }
})

const User = mongoose.model<IUser>('User',userSchema)
export default User
