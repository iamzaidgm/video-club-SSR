const express = require('express');

function home (req, res, next) {
    res.render('index', { title : 'Express' });
}

function login(req, res, next) {
    res.render('index', { title : 'Express' });
}

module.exports = {
    home,
    login
}