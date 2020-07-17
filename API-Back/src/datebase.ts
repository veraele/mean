import { connect } from 'mongoose';

export async function startConection() {
    await connect('mongodb://localhost:27017/gallery-db', {
        useNewUrlParser:true,
        useFindAndModify: false
    });
    console.log('Database is connected');
    
}
/**
 * docker run --name mongo -p 27017:27017 -d mongo:4.0 mongod 
 * docker start mongo
 */