import path from 'path';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

import app from '../src/app';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;
const assert = chai.assert;

const createPhoto = () =>  {
    return new Promise((resolve, reject) => {
        chai.request(app)
            .post('/api/photos/')
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'titulito')
            .field('description', 'descripcion de prueba')
            .attach('image',path.resolve(__dirname, 'assets/test_logo.jpg'),"test_logo.jpg")
            .send()
            .end((err, res) => {
                if(err) {
                    console.log(err);
                    reject(err);
                }
                console.log('Post Successful');
                console.log(res.body);
                const id = res.body.photo._id;
                expect(res).to.have.status(200);
                resolve(id);
            });
    });
}

describe('API test: /api/photos', () => {
    it('get a photo', (done) => {
        createPhoto().then((id) => {
            console.log('jajaja', id);
            chai.request(app)
            .get('/api/photos/'+ id)
            .send()
            .end((err, res) => {
                console.log('res.status', res.status);
                console.log('res.text', res.text);
                console.log('res.body', res.body);
                expect(res).to.have.status(200);
                done();
            });
        });
    });
    
    it('Update a photo', (done) => {
        createPhoto().then((id) => {
            chai.request(app)
            .put('/api/photos/'+ id)
            .send({
                description: 'new description',
                title: 'new title'
            })
            .end((err, res) => {
                console.log(res.body);
                expect(res).to.have.status(200);
                done();
            });
        });
    });

    it('get all photos', (done) => {
        createPhoto().then(_ => {
            chai.request(app)
            .get('/api/photos')
            .send()
            .end((err, res) => {
                console.log('res.body', res.body);
                expect(res).to.have.status(200);
                done();
            });
        })
    });

    it('delete a photo', (done) => {
        createPhoto().then((id) => {
            chai.request(app)
            .delete('/api/photos/'+ id)
            .send()
            .end((err, res) => {
                console.log('res.status', res.status);
                expect(res).to.have.status(200);
                done();
            });
        });
    });
});
