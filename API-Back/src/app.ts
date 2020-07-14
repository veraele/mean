import express from 'express'
import morgan from 'morgan';
import indexRoutes from './routes/index';
import path from 'path';
import cors from 'cors';

const app = express();

//settings
app.set('port', process.env.PORT || 3300 );

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// routes 
app.use("/api", indexRoutes);

// storage
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;