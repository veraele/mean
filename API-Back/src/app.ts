import express from 'express'
import morgan from 'morgan';
import indexRoutes from './routes/index';
import path from 'path';
import cors from 'cors';
import {startConection} from './datebase'

const app = express();
const port = 3300;
//settings
app.set('port', process.env.PORT || port );

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
startConection();
app.listen(port);
console.log('server on port: ',port);

// routes 
app.use("/api", indexRoutes);

// storage
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;
