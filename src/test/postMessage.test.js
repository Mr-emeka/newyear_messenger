import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('Message save', () => {
  it('post message gets saved ', (done) => {
    chai.request(app)
      .post('/api/v1/create')
      .send({
        message: 'Happy new year to you',
        senderEmail: 'adams@gmail.com',
        receiversEmail: 'marok@gmail.com',
        date: new Date().toLocaleString()
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
      })
    done();
  })

})