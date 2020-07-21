import app from '../src/app';
//import main from '../src/index'
import path from 'path';
import fs from 'fs-extra';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
let id: string = "5f16f82ef1d09a1183611fb9";
//const url= 'http://localhost:3300';
//main();
describe('API test: POST /api/photos', () => {
    it('post a photo', (done)=> {
       chai.request(app)
        .post('/api/photos/')
        .set("Content-Type", "multipart/form-data")
        .field('title', 'titulito')
        .field('description', 'descripcion de prueba')
        .attach('image',path.resolve(__dirname, "assets/test_logo.jpg"),"test_logo.jpg")
        .end((err, res) => {
            if(err) {
                console.log(err);
            }
            console.log('Post Successful');
            
            console.log(res.body);
            
            id = res.body.photo._id;
            expect(res).to.have.status(200);
            done();
        }).catch(err => {console.log('error post -> '+err);});
    });
});

describe('API test: GET /api/photos', () => {
    it('get a photo ', (done)=> {
        chai.request(app)
        .get('/api/photos/'+ id)
        .then((res) => {
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        }).catch(err => console.log(' error get -> ' + err) );
    });
});

describe('API test: PUT /api/photos', () => {
    it('Update a photo ', (done)=> {
        chai.request(app)
        .put('/api/photos/'+ id)
        .send({description: 'new description', title: 'new title'})
        .then((res) => {
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        }).catch(err => console.log(' error put -> ' + err) );
    });
});

describe('API test: GET /api/photos', () => {
    it('get all photos ', (done)=> {
        chai.request(app)
        .get('/api/photos')
        .then((res) => {
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        }).catch(err => console.log(' error get2 -> ' + err) );
    });
});

describe('API test: DELETE /api/photos', () => {
    it('delete a photo ', (done)=> {
        chai.request(app)
        .delete('/api/photos/'+ id)
        .then((res) => {
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        }).catch(err => console.log(' error delete  -> ' + err) );
    });
});
