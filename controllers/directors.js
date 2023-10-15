const express = require('express');

//post
function create(req, res, next) {
    res.send('Directors created');
}

//get
function list(req, res, next) {
    res.send('Directors list');
} 

//get
function index(req, res, next) {
    res.send('Directors index');
}

//put
function replace(req, res, next) {
    res.send('Directors replaced');
}

//patch
function update(req, res, next) {
    res.send('Directors updated');
}

//delete
function destroy(req, res, next) {
    res.send('Directors destroyed');
}

module.exports = {
    create,
    list,
    index,
    replace,
    update,
    destroy
}