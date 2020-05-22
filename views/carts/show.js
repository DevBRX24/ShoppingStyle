const layout = require('../admin/layout');

module.exports = ({ items }) => {
  const totalPrice = items.reduce((prev, item) => {
    return prev + item.quantity * item.product.price;
  }, 0);

  const renderedItems = items
    .map((item) => {
      return `
          <h1>${item.product.title}, ${item.product.price} * ${item.quantity}</h1>
        `;
    })
    .join('');

  return layout({
    content: `<h1>Cart</h1>
          ${renderedItems}
           <h1>Total: ${totalPrice}</h1>
        `,
  });
};
