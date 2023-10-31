const express = require('express');
const Member = require('../models/member');

//post
function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const address = req.body.address;

    let member = new Member({
        name: name,
        lastName: lastName,
        phone: phone,
        address: address
    });

    member.save()
          .then(object => res.status(200).json({
            message: "New Member created and saved",
            obj: object
          })).catch(ex => res.status(500).json({
            message: "Memeber could not be created or saved",
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

    Member.paginate({}, options)
          .then(objects => res.status(200).json({
            message: "Members list",
            obj: objects
          })).catch(ex => res.status(500).json({
            message: "Members list could not be showed",
            obj: ex
          }));
}

//get
function index(req, res, next) {
    const id = req.params.id;

    Member.findOne({ "_id" : id })
          .then(object => res.status(200).json({
            message: `Information of the Member with id ${id}`,
            obj: object
          })).catch(ex => res.status(500).json({
            message: `Could not show the information of the Member with id ${id}`,
            obj: ex
          }));
}

//put
function replace(req, res, next) {
    const id = req.params.id;

    const name = req.body.name ? req.body.name : "";
    const lastName = req.body.lastName ? req.body.lastName : "";
    const phone = req.body.phone ? req.body.phone : "";
    const address = req.body.address ? req.body.address : "";

    let member = new Object({
        _name: name,
        _lastName: lastName,
        _phone: phone,
        _address: address
    });

    Member.findOneAndUpdate({ "_id" : id }, member, { new : true })
          .then(object => res.status(200).json({
            message: "Member replaced correctly",
            obj: object
          })).catch(ex => res.status(500).json({
            message: "Could not replace Member correctly",
            obj: ex
          }));
}

//patch
function update(req, res, next) {
    const id = req.params.id

    const name = req.body.name;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const address = req.body.address;

    let member = new Object();

    if (name) member._name = name;
    if (lastName) member._lastName = lastName;
    if (phone) member._phone = phone;
    if (address) member.address = address;

    Member.findOneAndUpdate({ "_id" : id }, member)
          .then(object => res.status(200).json({
            message: "Member updated correctly",
            obj: object
          })).catch(ex => res.status(500).json({
            message: "Could not update Member correctly",
            obj: ex
          }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Member.findOneAndRemove({ "_id" : id })
          .then(object => res.status(200).json({
            message: "Member deleted correctly",
            obj: object
          })).catch(ex => res.status(500).json({
            message: "Could not delete Member correctly",
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