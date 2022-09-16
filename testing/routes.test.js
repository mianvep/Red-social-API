const app = require("../src/app");

const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Testing de las rutas de la red social", () => {
  it("Deberia retornar un error si intento registrar un usuario sin informacion", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/register")
      .end((err, res) => {
        chai.assert.equal(res.status, 400);
        done();
      });
  });
  it("Deberia retornar un status exitoso si registro un usuario con la informacion necesaria", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/register")
      .send({
        name: "Prueba",
        gender: "male",
        birthday_date: "2000/01/01",
        email: "testeando@testing.com",
        password: "m1_t3st1ng",
        phone: "4622186544",
      })
      .end((err, res) => {
        chai.assert.equal(res.status, 201);
        done();
      });
  });
  it("Deberia retornar un status exitoso si inicio sesion con mi usuario", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "testeando@testing.com",
        password: "m1_t3st1ng",
      })
      .end((err, res) => {
        chai.assert.equal(res.status, 200);
        done();
      });
  });
  it("Deberia retornar un status exitoso si creo una nueva publicacion como usuario loggeado", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "testeando@testing.com",
        password: "m1_t3st1ng",
      })
      .end((err, res) => {
        const token = res.body.token;
        chai.assert.equal(res.status, 200);
        chai
          .request(app)
          .post("/api/v1/publications")
          .set("Authorization", `JWT ${token}`)
          .send({
            description: "Esta es una publicacion de prueba",
          })
          .end((err, res) => {
            chai.assert.equal(res.status, 201);
            chai.assert.equal(
              res.body.description,
              "Esta es una publicacion de prueba"
            );
            done();
          });
      });
  });
    it("Deberia retornar un error si intento crear una publicacion sin estar loggeado", (done) => {
        chai.request(app)
            .post("/api/v1/publications")
            .send({
                description: "Esta es una publicacion de prueba",
            })
            .end((err, res) => {
                chai.assert.equal(res.status, 401);
                done();
            });
        });

    it("Deberia retornar mis propias publicaciones", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "testeando@testing.com",
        password: "m1_t3st1ng",
      })
      .end((err, res) => {
        const token = res.body.token;
        chai.assert.equal(res.status, 200);
        chai
          .request(app)
          .get("/api/v1/users/me/publications")
          .set("Authorization", `JWT ${token}`)
          .end((err, res) => {
            chai.assert.equal(res.status, 201);
            chai.assert.equal(
              res.body[0].description,
              "Esta es una publicacion de prueba"
            );
            done();
          });
      });
  });
});

