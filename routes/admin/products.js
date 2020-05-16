const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

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
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      return res.send(productsNewTemplate({ errors }));
    }

    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;
    await productsRepo.create({ title, price, image });

    res.send('Submitted');
  }
);

module.exports = router;
