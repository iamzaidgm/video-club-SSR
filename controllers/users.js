const express = require('express');
const User = require('../models/user');

//post
function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    let user = new User({
        name: name,
        lastName: lastName,
        email: email,
        password: password
    });

    user.save()
        .then(object => res.status(200).json({
            message: "New User created and saved",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "User could not be created or saved",
            obj: ex
        }));
}

//get
function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 5
    }

    User.paginate({}, options)
        .then(objects => res.status(200).json({
            message: "Users list",
            obj: objects
        })).catch(ex => res.status(500).json({
            message: "Users list could not be showed",
            obj: ex
        }));
}

//get
function index(req, res, next) {
    const id = req.params.id;

    User.findOneAndUpdate({ "_id" : id })
        .then(object => res.status(200).json({
            message: `Information of the User with the id ${id}`,
            obj: object
        })).catch(ex => res.status(500).json({
            message: `Could not show the information of the User with id ${id}`,
            obj: ex
        }));
}

//put
function replace(req, res, next) {
    const id = req.params.id;

    const name = req.body.name ? req.body.name : "";
    const lastName = req.body.lastName ? req.body.lastName : "";
    const email = req.body.email ? req.body.email : "";
    const password = req.body.password ? req.body.password : "";

    let user = new Object({
        _name: name,
        _lastName: lastName,
        _email: email,
        _password: password
    });

    User.findOneAndUpdate({ "_id" : id }, user, { new : true })
        .then(object => res.status(200).json({
            message: "User replaced correctly",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "Could not replace User correctly",
            obj: ex
        }));
}

//patch
function update(req, res, next) {
    const id = req.params.id;

    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    let user = new Object();

    if (name) user._name = name;
    if (lastName) user._lastName = lastName;
    if (email) user._email = email;
    if (password) user._password = password;

    User.findOneAndUpdate({ "_id" : id}, user)
        .then(object => res.status(200).json({
            message: "User updated correctly",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "Could not update User correctly",
            obj: ex
        }));
}

//delete
function destroy(req, res, next) {
    const id = req.params.id;

    User.findOneAndRemove({ "_id" : id })
        .then(object => res.status(200).json({
            message: "User deleted correctly",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "Could not delete User correctly",
            obj: ex
        }));
}

module.exports = {
    create,
    list,
    index,
    replace,
    update,
    destroy
}