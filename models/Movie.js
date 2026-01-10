import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  genre: String,
  year: Number,
  rating: Number,
  posterUrl: String
},{ timestamps:true });

export default mongoose.model('Movie', movieSchema);
