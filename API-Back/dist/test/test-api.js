"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../src/app"));
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
require("mocha");
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
describe('API test: /api/photos', () => {
    it('Method POST', (done) => {
        return chai_1.default.request(app_1.default)
            .post('/api/photos')
            .send({ title: "Titulo", description: "descripcion" })
            .end((err, res) => {
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        });
    });
});
