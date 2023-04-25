/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  describe('/Dogs', () => {
    it('should get 200', () =>
      agent.get('/Dogs').expect(200)
    );
  });
  describe('/Dogs/?name=', () => {
    it('GET respond with status 200 if the name is a string', () =>
      agent.get('/Dogs/?name=').expect(200)
)});
});
