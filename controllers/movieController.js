import Movie from '../models/Movie.js';

export const getMovies = async (req,res)=>{
  const movies = await Movie.find();
  res.json(movies);
};

export const getMovie = async (req,res)=>{
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
};

export const createMovie = async (req,res)=>{
  const movie = await Movie.create(req.body);
  res.json(movie);
};

export const updateMovie = async (req,res)=>{
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(movie);
};

export const deleteMovie = async (req,res)=>{
  await Movie.findByIdAndDelete(req.params.id);
  res.json({message:'Deleted'});
};
