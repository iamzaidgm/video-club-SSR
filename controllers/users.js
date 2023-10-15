const express = require('express');

//post
function create(req, res, next) {
    res.send('Users create');
}

//get
function list(req, res, next) {
    res.send('Users list');
}

//get
function index(req, res, next) {
    res.send('Users index');
}

//put
function replace(req, res, next) {
    res.send('Users replaced');
}

//patch
function update(req, res, next) {
    res.send('Users updated');
}

//delete
function destroy(req, res, next) {
    res.send('Users deleted');
}

module.exports = {
    create,
    list,
    index,
    replace,
    update,
    destroy
}