const express = require('express');
const Director = require('../models/director');

//post
function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;

    let director = new Director({
        name: name,
        lastName: lastName
    });

    director.save()
            .then(object => res.status(200).json({
                message: "New Director created and saved",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "Director could not be created or saved",
                obj: ex
            }));
}

//get
function list(req, res, next) {
    // Se usa page porque se usara paginacion, para mostrar poco a poco los elementos, o sea por paginas
    let page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 5 // Limite de objetos por pagina
    };

    // El parametro {} se usa para los criterios de busqueda, es decir para seleccionar documentos de la coleccion, en este caso se
    // estan buscando todos los documentos sin ningun filtro especifico, y el siguiente parametro "options" son las opciones
    // para personalizar la paginacion
    Director.paginate({}, options)
            .then(objects => res.status(200).json({
                message: "Directors list",
                obj: objects
            })).catch(ex => res.status(500).json({
                message: "Directors list could not be showed",
                obj: ex
            }));
} 

//get
function index(req, res, next) {
    const id = req.params.id;

    Director.findOne({ "_id" : id })
            .then(object => res.status(200).json({
                message: `Information of the Director with id ${id}`,
                obj: object
            })).catch(ex => res.status(500).json({
                message: `Could not show the information of the Director with id ${id}`
            }));
}

//put
function replace(req, res, next) {
    const id = req.params.id;
    const name = req.body.name ? req.body.name : "";
    const lastName = req.body.lastName ? req.body.lastName : "";

    let director = new Object({
        _name: name,
        _lastName: lastName
    });

    // En findOneAndUpdate, el ultimo parametro de new significa que se regresa la lista el metodo devolvera el documento
    // actualizado despues de hacer la actualizacion, si se establece en false entonces o se omite, devuleve el documento antes
    // de actualizarlo
    Director.findOneAndUpdate({ "_id" : id }, director, { new : true })
            .then(object => res.status(200).json({
                message: "Director replaced correctly",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "Could not replace Director correctly",
                obj: ex
            }));
}

//patch
function update(req, res, next) {
    const id = req.params.id;
    const name = req.body.name;
    const lastName = req.body.lastName;

    let director = new Object();

    if(name) director._name = name;
    if(lastName) director._lastName = lastName;

    // En este caso no se usa new ya que update usa el metodo patch, por lo que solo se cambian atributos especificos de un objeto
    // y no todo el objeto en si como put, entonces no es necesario devolver el recuros completo, con un mensaje es suficiente
    Director.findOneAndUpdate({ "_id" : id }, director)
            .then(object => res.status(200).json({
                message: "Director updated correctly",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "Could not update Director correctly",
                obj: ex
            }));
}

//delete
function destroy(req, res, next) {
    const id = req.params.id;

    Director.findByIdAndRemove({ "_id" : id })
            .then(object => res.status(200).json({
                message: "Director deleted correctly",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "Could not delete Director correctly",
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