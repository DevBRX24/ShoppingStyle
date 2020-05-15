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
  [requireTitle, requirePrice],
  upload.single('image'),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    console.log(req.file);
    res.send('Submitted');
  }
);

module.exports = router;
