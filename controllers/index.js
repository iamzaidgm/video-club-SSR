const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const config = require('config');

function home (req, res, next) {
    res.render('index', { title : 'Express' });
}

function login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const JwtKey = config.get("secret.key");;
    
    user.findOne({"_email":email}).then(user => {
        if(user){
            bcrypt.hash(password, user.salt, (err, hash)=>{
                if(err){
                    // regresar 403
                    res.status(403).json({
                        msg: res.__('login.wrong'),
                        obj: err
                    });
                }
                if(hash === user.password){
                    res.status(200).json({
                        msg: res.__('login.ok'),
                        obj: jwt.sign({data:user.data, exp: Math.floor(Date.now()/1000)+180}, JwtKey)
                    });
                }else{
                    res.status(403).json({
                        msg: res.__('login.wrong'),
                        obj: null
                    });
                }
            });
        }else {
            // regresar 403
            res.status(403).json({
                msg: res.__('login.wrong'),
                obj: err
            });
        }
    }).catch(ex => res.status(403).json({
        msg: res.__('login.wrong'),
        obj: err
    }));;

}

module.exports = {
    home,
    login
}