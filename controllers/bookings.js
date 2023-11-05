const express = require('express');
const Booking = require('../models/booking');

function create(req, res, next) {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const memberId = req.body.memberId;
    const copyId = req.body.copyId;
    const status = req.body.status;

    let booking = new Booking({
        startDate: startDate,
        endDate: endDate,
        member: memberId,
        copy: copyId,
        status: status
    });

    booking.save()
        .then(object => res.status(200).json({
            message: "Nuevo préstamo creado y guardado",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "El préstamo no se pudo crear ni guardar",
            obj: ex
        }));
}

function list(req, res, next) {
    let page = req.params.page;

    const options = {
        page: page,
        limit: 5,
        populate: ["_member", "_copy"]
    };

    Booking.paginate({}, options)
        .then(objects => res.status(200).json({
            message: "Lista de prestamos",
            obj: objects
        })).catch(ex => res.status(500).json({
            message: "La lista de prestamos no se puede mostrar",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;

    Booking.findOne({ "_id" : id }).populate(["_member", "_copy"])
        .then(object => res.status(200).json({
            message: `Informacion del prestamo con el id ${id}`,
            obj: object
        })).catch(ex => res.status(500).json({
            message: `No se puede mostrar informacion del prestamo con el id ${id}`,
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;

    const startDate = req.body.startDate ? req.body.startDate : "";
    const endDate = req.body.endDate ? req.body.endDate : "";
    const memberId = req.body.memberId ? req.body.memberId : "";
    const copyId = req.body.copyId ? req.body.copyId : "";
    const status = req.body.status ? req.body.status : "";

    let booking = new Object({
        _startDate: startDate,
        _endDate: endDate,
        _member: memberId,
        _copy: copyId,
        _status: status
    });

    Booking.findOneAndUpdate({ "_id" : id }, booking, { new : true })
        .then(object => res.status(200).json({
            message: "Préstamo reemplazado correctamente",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "No se pudo reemplazar el préstamo correctamente",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;

    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const memberId = req.body.memberId;
    const copyId = req.body.copyId;
    const status = req.body.status;

    let booking = new Object();

    if (startDate) booking._startDate = startDate;
    if (endDate) booking._endDate = endDate;
    if (memberId) booking._memberId = memberId;
    if (copyId) booking._copyId = copyId;
    if (status) booking._status = status;

    Booking.findOneAndUpdate({ "_id" : id }, booking)
        .then(object => res.status(200).json({
            message: "Préstamo actualizado correctamente",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "No se pudo actualizar el préstamo correctamente",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Booking.findOneAndRemove({ "_id" : id })
        .then(object => res.status(200).json({
            message: "Préstamo eliminado correctamente",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "No se pudo eliminar el préstamo correctamente",
            obj: ex
        }));
}

module.exports = {create, list, index, replace, update, destroy}