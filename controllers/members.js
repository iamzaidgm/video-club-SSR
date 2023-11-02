const express = require('express');
const Member = require('../models/member');

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
            message: "Nuevo socio creado y guardado",
            obj: object
          })).catch(ex => res.status(500).json({
            message: "No se pudo crear ni guardar el socio",
            obj: ex
          }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 5
    }

    Member.paginate({}, options)
          .then(objects => res.status(200).json({
            message: "Lista de socios",
            obj: objects
          })).catch(ex => res.status(500).json({
            message: "No se pudo mostrar la lista de socios",
            obj: ex
          }));
}

function index(req, res, next) {
    const id = req.params.id;

    Member.findOne({ "_id" : id })
          .then(object => res.status(200).json({
            message: `Información del socio con el id ${id}`,
            obj: object
          })).catch(ex => res.status(500).json({
            message: `No se pudo mostrar la información del socio con el id. ${id}`,
            obj: ex
          }));
}

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
            message: "Socio reemplazado correctamente",
            obj: object
          })).catch(ex => res.status(500).json({
            message: "No se pudo reemplazar al socio correctamente",
            obj: ex
          }));
}

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
            message: "Socio actualizado correctamente",
            obj: object
          })).catch(ex => res.status(500).json({
            message: "No se pudo actualizar socio correctamente",
            obj: ex
          }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Member.findOneAndRemove({ "_id" : id })
          .then(object => res.status(200).json({
            message: "Socio eliminado correctamente",
            obj: object
          })).catch(ex => res.status(500).json({
            message: "No se pudo eliminar el socio correctamente",
            obj: ex
          }));
}

module.exports = {create, list, index, replace, update, destroy}