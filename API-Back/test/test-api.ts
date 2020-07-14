import app from '../src/app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const url= 'http://localhost:3300/api';
/*
describe('API test: /api/photos', () => {
    it('Method POST', async (done)=> {
        return await chai.request(url)
        .post('/photos')
        .send({title: "Titulo", description: "descripcion"})
        .end((err, res) => {
            if(err) {
                console.log(err);
            }
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        });
    });
});
*/
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

describe('API test: GET /api/photos', () => {
    it('get one photo ', (done)=> {
        chai.request(url)
        .get('/photos/5f0dacf5ae0dcb21b7c5e132')
        .then((res) => {
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        }).catch(err => console.log(' error ->' + err) );
    });
});