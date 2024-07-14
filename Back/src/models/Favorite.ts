import mongoose, { Document, Schema } from 'mongoose';

export interface IFavorite extends Document {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: Date;
}

const favoriteSchema: Schema = new Schema({
  videoId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Favorite = mongoose.model<IFavorite>('Favorite', favoriteSchema);

export default Favorite;
