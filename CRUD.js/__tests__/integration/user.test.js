const { writeFile } = require('../../src/shared/fileMethods')
const supertest = require('supertest');
const app = require('../../src/expressConfig');
const req = supertest(app);

describe('Testes de Usuario', () => {

  describe('Testando POST', () => {
    it('Listando usuários com o banco vazio', () => {
      req.get('/api/v1/users')
        .expect(400).end((err, res) => {
          expect(res.body).toStrictEqual({
            "errorMessage": "não há usuários cadastrados"
          })
        });
    })
    it('Criando usuário - 1', () => {
      req.post('/api/v1/users')
        .send(
          {
            "email": "carlos123@gmail.com",
            "senha": "12345"
          }).expect(201).end((err, res) => {
            expect(res.body).toStrictEqual({
              "email": "carlos123@gmail.com",
              "senha": "12345"
            })
          })
    });
    it('Criando usuário com email existente- 2', () => {
      req.post('/api/v1/users')
        .send(
          {
            "email": "carlos123@gmail.com",
            "senha": "12345"
          }).expect(400).end((err, res) => {
            expect(res.body).toStrictEqual({
              "errors": [
                {
                  "value": "carlos123@gmail.com",
                  "msg": "Já possui um cadastro com este e-mail",
                  "param": "email",
                  "location": "body"
                }
              ]
            })
          })
    });

  })
  describe('Testando GET', () => {
    it('Listando usuário - 1', () => {
      req.get('/api/v1/users/1')
        .expect(200).end((err, res) => {
          expect(res.body).toStrictEqual({
            "email": "carlos123@gmail.com",
            "senha": "12345",
            "id": 1
          })
        });
    })
    it('Listando todos usuários', () => {
      req.get('/api/v1/users')
        .expect(200).end((err, res) => {
          expect(res.body).toStrictEqual([{
            "email": "carlos123@gmail.com",
            "senha": "12345",
            "id": 1
          }])
        });
    })
    it('Criando usuário - 2', () => {
      req.post('/api/v1/users')
        .send(
          {
            "email": "carlos35xd@gmail.com",
            "senha": "praia"
          }).expect(201).end((err, res) => {
            expect(res.body).toStrictEqual({
              "email": "carlos35xd@gmail.com",
              "senha": "praia"
            })
          })
    });
    it('Listando todos usuários', () => {
      req.post('/api/v1/users/1')
        .expect(200).end((err, res) => {
          expect(res.body).toStrictEqual([
            {
              "email": "carlos123@gmail.com",
              "senha": "12345",
              "id": 1
            },
            {
              "email": "carlos35xd@gmail.com",
              "senha": "praia",
              "id": 2
            }
          ])
        });
    });
  })
  describe('Testando PUT', () => {
    it('Atualizando email do usuário - 1', () => {
      req.put('/api/v1/users/1')
        .send(
          {
            "email": "carlosAtualizado@gmail.com",
          }).expect(201).end((err, res) => {
            expect(res.body).toStrictEqual({
              "email": "carlosAtualizado@gmail.com",
              "senha": "12345"
            })
          })
    });
    it('Atualizando email do usuário - 2', () => {
      req.put('/api/v1/users/2')
        .send(
          {
            "email": "carlosAtualizado2@gmail.com",
          }).expect(201).end((err, res) => {
            expect(res.body).toStrictEqual({
              "email": "carlosAtualizado2@gmail.com",
              "senha": "praia"
            })
          })
    });
    it('Atualizando senha do usuário - 2', () => {
      req.put('/api/v1/users/2')
        .send(
          {
            "senha": "qlqcoisa123",
          }).expect(201).end((err, res) => {
            expect(res.body).toStrictEqual({
              "email": "carlosAtualizado2@gmail.com",
              "senha": "qlqcoisa123"
            })
          })
    });
    it('Atualizando usuário que não existe', () => {
      req.put('/api/v1/users/9')
        .send(
          {
            "email": "carlosAtualizado2@gmail.com",
          }).expect(404).end((err, res) => {
            expect(res.body).toStrictEqual({
              "errorMessage": "Não foi possível encontrar usuário"
            })
          })
    });
  })
  describe('Testando DELETE', () => {
    it('Deletando usuário - 1', () => {
      req.delete('/api/v1/users/1')
        .expect(200).end((err, res) => {
          expect(res.body).toStrictEqual({
            "email": "carlosAtualizado@gmail.com",
            "senha": "12345",
            "id": 1
          })
        });
    });
    it('Deletando usuários', () => {
      req.delete('/api/v1/users')
        .expect(200).end((err, res) => {
          expect(res.body).toStrictEqual([
            {
              "email": "carlosAtualizado2@gmail.com",
              "senha": "praia",
              "id": 2
            }
          ])
        });
    });
    it('Deletando usuário que não existe', () => {
      req.delete('/api/v1/users/1')
        .expect(404).end((err, res) => {
          expect(res.body).toStrictEqual({
            "errorMessage": "Usuario não encontrado"
          })
        });
    });
  })

  describe('Testando validação do body', () => {
    it('Criando usuário sem email', () => {
      req.post('/api/v1/users')
        .send(
          {
            "senha": "1234we5"
          }).expect(201).end((err, res) => {
            expect(res.body).toStrictEqual({
              "errors": [
                {
                  "msg": "email não informado",
                  "param": "email",
                  "location": "body"
                },
                {
                  "msg": "O campo email deve conter pelo menos 9 caracteres",
                  "param": "email",
                  "location": "body"
                },
                {
                  "msg": "Precisa ser um e-mail válido",
                  "param": "email",
                  "location": "body"
                }
              ]
            })
          })
    });
    it('Criando usuário sem senha', () => {
      req.post('/api/v1/users')
        .send(
          {
            "email": "carlosk2@gmail.com"
          }).expect(201).end((err, res) => {
            expect(res.body).toStrictEqual({
              "errors": [
                {
                  "msg": "senha não informada",
                  "param": "senha",
                  "location": "body"
                },
                {
                  "msg": "O campo senha deve conter pelo menos 5 caracteres",
                  "param": "senha",
                  "location": "body"
                }
              ]
            })
          })
    });
    it('Atualizando usuário sem dados', () => {
      req.put('/api/v1/users/1')
        .send(
          {
          }).expect(201).end((err, res) => {
            expect(res.body).toStrictEqual({
              "errors": [
                {
                  "errorMessage": "informe os dados para atualizar"
                }
              ]
            })
          })
    });

  })




  afterAll((done) => {
    writeFile([]);
    done();
  })

})