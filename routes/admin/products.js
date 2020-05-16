const express = require('express');
const multer = require('multer');

const { handleErrors } = require('./middlewares');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validator');

const router = express.Router();
// Middleware function for handling image upload
const upload = multer({ storage: multer.memoryStorage() });

router.get('/product', (req, res) => {});

router.get('/new', (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  '/new',
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  async (req, res) => {
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;
    await productsRepo.create({ title, price, image });

    res.send('Submitted');
  }
);

module.exports = router;
