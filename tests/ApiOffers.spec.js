import * as configAPI from '../src/constants/APIConfig';
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();


chai.use(chaiHttp);

let queryBasket = [
    "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
    "a460afed-e5e7-4e39-a39d-c885c05db861",
    "c30968db-cb1d-442e-ad0f-80e37c077f89",
    "78ee5f25-b84f-45f7-bf33-6c7b30f1b502"
];

describe('/GET offer', () => {
    it('it should GET the offer', (done) => {
        chai.request(configAPI.API_URI + '/' + queryBasket + configAPI.END_POINT_OFFERS)
            .get(configAPI.END_POINT)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});