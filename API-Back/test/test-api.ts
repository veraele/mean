import app from '../src/app';
import path from 'path';
import fs from 'fs-extra';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
let id: string;
const url= 'http://localhost:3300/api';

describe('API test: POST /api/photos', () => {
    it('post a photo', (done)=> {
       chai.request(url)
        .post('/photos')
        .set('Content-Type','multipart/form-data')
        .field('title', 'titulito')
        .field('description', 'descripcion de prueba')
        .attach('image', "assets/test_logo.jpg")
        .end((err, res) => {
            if(err) {
                console.log(err);
            }
            console.log(res.body);
            console.log(' id --> '+ res.body.photo._id);
            
            id = res.body.photo._id;
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe('API test: GET /api/photos', () => {
    it('get a photo ', (done)=> {
        chai.request(url)
        .get('/photos/'+ id)
        .then((res) => {
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        }).catch(err => console.log(' error ->' + err) );
    });
});

describe('API test: PUT /api/photos', () => {
    it('Update a photo ', (done)=> {
        chai.request(url)
        .put('/photos/'+ id)
        .send({description: 'new description', title: 'new title'})
        .then((res) => {
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        }).catch(err => console.log(' error -> ' + err) );
    });
});

describe('API test: GET /api/photos', () => {
    it('get all photos ', (done)=> {
        chai.request(url)
        .get('/photos')
        .then((res) => {
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        }).catch(err => console.log(' error ->' + err) );
    });
});

describe('API test: DELETE /api/photos', () => {
    it('delete a photo ', (done)=> {
        chai.request(url)
        .delete('/photos/'+ id)
        .then((res) => {
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        }).catch(err => console.log(' error -> ' + err) );
    });
});
