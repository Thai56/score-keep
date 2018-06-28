/* eslint-env node, mocha */
const { expect } = require('chai');
const request = require('request');

/* Was having issue with requiring port from config due to decrypt dependency */
const url = `http://localhost:8880/contestants`;

describe('Contestants API ', () => {
  it('should give a status 200 for all contestants ', (done) => {
    request(`${url}`, (error, result, body) => {
      expect(result.statusCode).to.equal(200);
      expect(JSON.parse(body).length).to.equal(26);
      done();
    }); 
  })
  it('should give a status 200 for top 25 contestants ', (done) => {
    request(`${url}/top`, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(body).length).to.equal(25);
      done();
    });
  });

  it('should record the name and score of contestant ', (done) => {
    request.post(`${url}/hank/18`, (error, response) => {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('should delete the contestant from the contestant list ', (done) => {
    request.delete(`${url}/hank`, (error, response) => {
      expect(response.statusCode).to.equal(202);
      done();
    });
  });

  it('should delete all of the contestants from the table ', () => {
    request.delete(`${url}`, (error, result) => {
      expect(result.statusCode).to.equal(202);
    }); 
  });
});
