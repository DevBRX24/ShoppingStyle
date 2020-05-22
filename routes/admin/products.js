const express = require('express');
const multer = require('multer');

const { handleErrors, requireAuth } = require('./middlewares');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const productsEditTemplate = require('../../views/admin/products/edit');
const { requireTitle, requirePrice } = require('./validator');

const router = express.Router();
// Middleware function for handling image upload
const upload = multer({ storage: multer.memoryStorage() });

router.get('/products', requireAuth, async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(productsIndexTemplate({ products }));
});

router.get('/new', requireAuth, (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  '/new',
  requireAuth,
  upload.single('image'),
  [requireTitle, requirePrice],
  // Middleware function for form check if all requirments was meet.
  handleErrors(productsNewTemplate),
  async (req, res) => {
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;
    await productsRepo.create({ title, price, image });

    // After creating a product admin will redirect to this new endpoint
    res.redirect('/products');
  }
);

router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
  const product = await productsRepo.getOne(req.params.id);

  if (!product) {
    return res.send('Product not found');
  }

  res.send(productsEditTemplate({ product }));
});

router.post(
  '/admin/products/:id/edit',
  requireAuth,
  upload.single('image'),
  [requireTitle, requirePrice],
  // Middleware function for form check if all requirments was meet.
  handleErrors(productsEditTemplate, async (req) => {
    const product = await productsRepo.getOne(req.params.id);
    return { product };
  }),
  async (req, res) => {
    const changes = req.body;

    if (req.file) {
      changes.image = req.file.buffer.toString('base64');
    }

    try {
      await productsRepo.update(req.params.id, changes);
    } catch (err) {
      return res.send('Could not find item');
    }
    res.redirect('/products');
  }
);

router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
  await productsRepo.delete(req.params.id);

  res.redirect('/products');
});

module.exports = router;
