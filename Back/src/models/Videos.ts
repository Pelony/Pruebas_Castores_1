import mongoose,{Schema,Document, PopulatedDoc,Types} from "mongoose";
import { IUser } from "./User";

export interface IVideos extends Document{
    nombre:string
    url:string
    favorito:boolean
    manager: PopulatedDoc<IUser & Document>
}

const videosSchema: Schema = new Schema({
    nombre:{
        type:String,
        required:true,
        lowercase:true,
    },
    url:{
        type:String,
        required:true
    },
    favorito:{
        type:Boolean,
        default:false
    },
    manager:{
        type:Types.ObjectId,
        ref:'User'
    }
})

const Videos = mongoose.model<IVideos>('Videos',videosSchema)
export default Videos
