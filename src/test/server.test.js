import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('GET landing page', () => {
    it('should display landing page', (done) => {
        chai.request(app)
        .get('/')
        .set('Cookie', `userId=${process.env.TEST_COOKIE}`)
        .end((err, res) => {
            res.should.have.status(200);
        })
        done();
    })
})