const path = require('path');
const Product = require('../model/Product.model');
const uploadFile = require('../utils/uploadFile');

const product = {
  async create(req, res) {
    let file = req.files.file;

    const fileName = await uploadFile(file);
    console.log('Nombre del archivo:', fileName);

    try {
      await Product.create({
        ...req.body,
        imagen: fileName,
      }).then((newProduct) => {
        console.log(newProduct);
        return res.status(201).json({
          message: 'Producto creado correctamente',
          data: newProduct,
        });
      });
    } catch (error) {
      console.log(error);
    }
  },

  async list(req, res) {
    try {
      await Product.findAll().then((findProduct) => {
        return res.status(200).json({
          message: 'Contactos encontrados',
          data: findProduct,
        });
      });
    } catch (error) {
      console.log(error);
    }
  },

  async findByID(req, res) {
    let id = req.params.id;

    try {
      await Product.findByPk(id).then((findByIDProduct) => {
        if (!findByIDProduct) {
          return res.status(404).json({
            message: 'Producto no existe',
          });
        }
        return res.status(200).json({
          message: 'Producto Encontrado',
          data: findByIDProduct,
        });
      });
    } catch (error) {
      console.log(error);
    }
  },

  async findImage(req, res) {
    try {
      const { imagen } = req.params;
      return res.sendFile(
        `${imagen}`,
        {
          root: path.resolve(__dirname, '../public/images/'),
        },
        (err) => {
          if (err) {
            return res.send('no existe la imagen');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  },

  async update(req, res) {
    const archivo = req.files;
    if (!archivo) {
      try {
        await Product.update(
          {
            ...req.body,
          },
          {
            where: {
              id: req.body.id,
            },
          }
        ).then((updatedProduct) => {
          console.log('Resultado del update sin archivo', updatedProduct);

          if (updatedProduct == 1) {
            return res.status(200).json({
              message: 'Producto actualizado',
            });
          }
          return res.status(200).json({
            message: 'No se realizo ninguna modificacion',
          });
        });
      } catch (error) {
        console.log(error);
      }
      return;
    }

    let file = req.files.file;

    const fileName = await uploadFile(file);
    console.log('Nombre del archivo:', fileName);

    try {
      await Product.update(
        {
          ...req.body,
          image: fileName,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      ).then((updatedProduct) => {
        console.log('Resultado del update con archivo', updatedProduct);

        if (updatedProduct == 1) {
          return res.status(200).json({
            message: 'Producto actualizado',
          });
        }
        return res.status(200).json({
          message: 'No se realizo ninguna modificacion',
        });
      });
    } catch (error) {
      console.log(error);
    }
  },

  async delete(req, res) {
    try {
      await Product.destroy({
        where: {
          id: req.params.id,
        },
      }).then((deletedProduct) => {
        if (deletedProduct == 1) {
          res.status(200).json({
            message: 'Producto eliminado correctamente',
          });
        }

        res.status(404).json({
          message: 'Producto no existe',
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = product;
