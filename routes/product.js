var express = require('express');
const productController = require('../controller/product.controller');
var router = express.Router();

router.post('/create', (req, res) => {
  // Validar valores de entrada:
  const { nombre, precio } = req.body;
  const file = req.files;

  if (!nombre) {
    return res.status(404).json({ message: 'El nombre es un campo requerido' });
  }

  if (!precio) {
    return res.status(404).json({ message: 'El precio es un campo requerido' });
  }

  if (!file) {
    return res.status(404).json({ message: 'El file es un campo requerido' });
  }

  productController.create(req, res);
});

router.get('/list', (req, res) => {
  productController.list(req, res);
});

router.get('/list/:id', (req, res) => {

  const {id} = req.params

  if (!id) {
    return res.status(404).json({
      message: "Es necesario el id para buscar el producto"
    })
  }

  productController.findByID(req, res);
});

router.get('/imagenes/:imagen', (req, res) => {
  productController.findImage(req, res);
});

router.put('/update', (req, res) => {
  const id = req.body.id;

  if (!id) {
    return res.status(404).json({
      message: 'Es necesario el id del producto para actualizar',
    });
  }

  productController.update(req, res);
});

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({
      message: 'Es necesario el id del producto para eliminar',
    });
  }

  productController.delete(req, res);
});

module.exports = router;
