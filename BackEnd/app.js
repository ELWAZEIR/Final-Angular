import express from'express';
import {dbConnect}  from './dbConnect.js'
// import cors from 'cors'
// import userRoutes from './routes/userRoutes.js'
// import authRoutes from './routes/authRoutes.js'
const app = express()

app.use(express.json());
// app.use(cors()); // Use cors middleware
dbConnect()
// app.use('/api/users',userRoutes);
// app.use('/api/auth',authRoutes);

export default app;