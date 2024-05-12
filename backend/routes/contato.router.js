const express = require('express');
const router = express.Router();
const contatoController = require('../controllers/contatoController');

// Rotas CRUD
router.get('/', contatoController.list);
router.post('/', contatoController.create);
router.get('/:id', contatoController.detail);
router.put('/:id', contatoController.update);
router.delete('/:id', contatoController.delete);

module.exports = router;
