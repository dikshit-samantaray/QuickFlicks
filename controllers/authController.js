import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req,res)=>{
  try{
    const {email,password}=req.body;
    const exists = await User.findOne({email});
    if(exists) return res.status(400).json({message:'User exists'});
    const hash = await bcrypt.hash(password,10);
    const user=await User.create({email,password:hash});
    res.json({message:'Registered'});
  }catch(err){res.status(500).json({message:'Server error'});}
};

export const login = async (req,res)=>{
  try{
    const {email,password}=req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:'Invalid creds'});
    const match = await bcrypt.compare(password,user.password);
    if(!match) return res.status(400).json({message:'Invalid creds'});
    const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.json({token,role:user.role});
  }catch(err){res.status(500).json({message:'Server error'});}
};
