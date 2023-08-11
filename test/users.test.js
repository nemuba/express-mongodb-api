const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../index.js');
const jwt = require('jsonwebtoken');
const { faker } = require('@faker-js/faker');
const Users = require('../models/users');


require('dotenv').config();

const Authorization = jwt.sign(process.env.ACCESS_TOKEN, process.env.SECRET_TOKEN)
console.log('auth',Authorization)

describe('Teste de integração', () => {
  it('Deve retornar todos os usuários', async () => {
    request(app)
      .get('/users')
      .set('Authorization', Authorization)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('Deve criar um novo usuário', async () => {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        type: faker.word.sample()
      };

    request(app)
      .post('/users')
      .set('Authorization', Authorization)
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('type');
      });
  });

  it('Deve retornar um usuário', async () => {
    const userId = await Users.findOne({}).then((user) => user._id);

    request(app)
      .get(`/users/${userId}`)
      .set('Authorization', Authorization)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('type');
      });
  });

  it('Deve atualizar um usuário', async () => {
    const userId = await Users.findOne({}).then((user) => user._id);

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      type: faker.word.sample()
    };

    request(app)
      .put(`/users/${userId}`)
      .set('Authorization', Authorization)
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
      }
    );
  });

  it('Deve deletar um usuário', async () => {
    const userId = await Users.findOne({}).then((user) => user._id);

    request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', Authorization)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
      });
  });

});