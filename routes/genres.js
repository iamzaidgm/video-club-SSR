const express = require('express');
const router = express.Router();
const controller = require('../controllers/genres');

router.post('/', controller.create); //Crear

router.get('/list/:page?', controller.list); //Leer

router.get('/:id', controller.index); //Leer

router.put('/:id', controller.replace); //Reemplazar

router.patch('/:id', controller.update); //Actualizar

router.delete('/:id', controller.destroy); //Eliminar

module.exports = router;