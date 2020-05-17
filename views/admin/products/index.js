const layout = require('../layout');

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return ` 
      <li class="table-row">
      <div class="col col-1" data-label="Title"> ${product.title}</div>
      <div class="col col-2" data-label="Price"> ${product.price}</div>
      <div class="col col-3" data-label="Edit">
      <a href="/admin/products/${product.id}/edit">
        <button class="btn-table btn-table--violet">Edit</button>
      </a>
      </div>
      <div class="col col-4" data-label="Delete">
      <button class="btn-table btn-table--orange">Delete</button>
      </div>
    </li>
    `;
    })
    .join('');

  return layout({
    content: ` 
    <div class="section-dtable">
      <div class="table-product">
        <h2 class="table-product__text">Charcoal Admin Panel</h2>
        <button class="btn-table btn-table--product">Products</button>
        <button class="btn-table btn-table--product">New Products</button>
      </div>
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-1">Title</div>
          <div class="col col-2">Price</div>
          <div class="col col-3">Edit</div>
          <div class="col col-4">Delete</div>
        </li>
        ${renderedProducts};
      </ul>
    </div>
        `,
  });
};
