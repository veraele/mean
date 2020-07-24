import { connect } from 'mongoose';

export async function startConection() {
    await connect('mongodb://database/gallery-db', {
        useNewUrlParser:true,
        useFindAndModify: false
    });
    console.log('Database is connected');
    
}
/**
 * npm run start-dev
 */