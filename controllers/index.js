const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

function home (req, res, next) {
    res.render('index', { title : 'Express' });
}

function login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const JwtKey = "ebc68964cfb0bba955af97edbba18468";
    user.findOne({"_email":email}).then(user => {
        if(user){
            bcrypt.hash(password, user.salt, (err, hash)=>{
                if(err){
                    // regresar 403
                    res.status(403).json({
                        msg: "usuario y/o contraseña incorrecta",
                        obj: err
                    });
                }
                if(hash === user.password){
                    res.status(200).json({
                        msg: "login ok",
                        obj: jwt.sign({data:user.data, exp: Math.floor(Date.now()/1000)+60}, JwtKey)
                    });
                }else{
                    res.status(403).json({
                        msg: "usuario y/o contraseña incorrecta",
                        obj: null
                    });
                }
            });
        }else {
            // regresar 403
            res.status(403).json({
                msg: "usuario y/o contraseña incorrecta",
                obj: err
            });
        }
    }).catch(ex => res.status(403).json({
        msg: "usuario y/o contraseña incorrecta",
        obj: err
    }));;

}

module.exports = {
    home,
    login
}