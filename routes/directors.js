const express = require('express');
const router = express.Router();
const controller = require('../controllers/directors');

router.post('/', controller.create); //Crear

router.get('/', controller.list); //Leer

// El mismo metodo de list pero con paginacion, se usa el "?" porque :page es opcional
router.get('/list/:page?', controller.index); //Leer

router.put('/:id', controller.replace); //Reemplazar

router.patch('/:id', controller.update); //Actualizar

router.delete('/:id', controller.destroy); //Eliminar

module.exports = router;