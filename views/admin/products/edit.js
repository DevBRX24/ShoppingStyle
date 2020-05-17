const layout = require('../layout');

module.exports = ({ product }) => {
  return layout({
    content: `
    <section class="section-product">
      <div class="product-container">
        <div class="product-content">
          <h1 class="product-text">Update Products</h1>
          <img src="img/edit.png" alt="Illustration" class="product-image" />
          </div>
        <div class="product-content">
          <form class="form products-form" method="POST">
            <div class="form__text">
              <span class="form__span">Keep </span> our products updated for our customers.
            </div>
            <div class="form__group">
              <input
              type="text"
              name="title"
              value="${product.title}"
              id="title"
              class="form__input"
              placeholder="Title"
              />
            <label for="title" class="form__label">Title</label>
            <div class="form__group">
              <input
              type="number"
              name="price"
              value="${product.price}"
              id="price"
              class="form__input"
              placeholder="Price"
              />
              <label for="Price" class="form__label">Price</label>
            </div>
            <div class="form__upload-btn-wrapper">
            <button class="form__btn-upload">Upload image</button>
            <input type="file" value="${product.image}" name="image" id="image" />
          </div>
          <button class="btn btn--violet">Update</button>
          </form>
        </div>
      </div>
    </section>
    `,
  });
};
