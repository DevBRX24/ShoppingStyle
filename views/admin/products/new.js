const layout = require('../layout');
const { getError } = require('../../helper');

// For handling the image upload form should have an encodedtype = multipart/form-data
// It will take the information inside the form and sens it to back-end piece by piece
module.exports = ({ errors }) => {
  return layout({
    content: `
    <section class="section-product">
      <div class="product-container">
        <div class="product-content">
          <h1 class="product-text">Create a Products</h1>
          <img src="img/create.png" alt="Illustration" class="product-image" />
        </div>
        <div class="product-content">
          <form class="form products-form" method="POST" enctype="multipart/form-data">
            <div class="form__text">
              <span class="form__span">Create </span> an amazing products for our customers.
            </div>
            <div class="form__group">
              <input
              type="text"
              name="title"
              id="title"
              class="form__input"
              placeholder="Title"
              />
            <label for="title" class="form__label">Title</label>
            <div class="form__error">${getError(errors, 'title')}</div>
            
            <div class="form__group">
              <input
              type="number"
              name="price"
              id="price"
              class="form__input"
              placeholder="Price"
              />
              <label for="Price" class="form__label">Price</label>
              <div class="form__error">${getError(errors, 'price')}</div>
            </div>
            <div class="form__upload-btn-wrapper">
            <button class="form__btn-upload">Upload image</button>
            <input type="file" name="image" id="image" />
          </div>
          <button class="btn btn--violet">Submit</button>
        </form>
        </div>
      </div>
  </section>
    `,
  });
};
