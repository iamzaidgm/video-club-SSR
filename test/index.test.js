const supetest = require('supertest');

const app = require('../app');

describe("Probar que el sistema de autenticación", ()=>{
    it("Debería de obtener un login con un user y un password ok", (done)=>{
        supetest(app).post("/login")
        .send({"email":"a353254@uach.mx", "password":"abcd1234"})
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    })
});