import { connect } from 'mongoose';

export async function startConection() {
    await connect('mongodb://localhost/gallery-db', {
        useNewUrlParser:true,
        useFindAndModify: false
    });
    console.log('Database is connected');
    
}
