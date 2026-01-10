import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import seedAdmin from './seed/adminSeed.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB().then(() => seedAdmin());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
