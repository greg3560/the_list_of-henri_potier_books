import * as configAPI from '../src/constants/APIConfig';
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET book', () => {
    it('it should GET all the books', (done) => {
        chai.request(configAPI.API_URI)
            .get(configAPI.END_POINT)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                res.body.data.length.should.be.eql(20);
                done();
            });
    });
});