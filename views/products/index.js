const layout = require('../admin/layout');

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
        <div class="card__item">
        <div class="card__image">
            <img src="data:image/png;base64, ${product.image}" class="card__image--content"/>
        </div>
        <div class="card__details">
            <h3 class="card__header">
                ${product.title}
            </h3>
            <div class="card__stars">
                <svg class="card__stars--icon">
                    <use xlink:href="img/sprite.svg#icon-star"></use>
                </svg>
                <svg class="card__stars--icon">
                    <use xlink:href="img/sprite.svg#icon-star"></use>
                </svg>
                <svg class="card__stars--icon">
                    <use xlink:href="img/sprite.svg#icon-star"></use>
                </svg>
                <svg class="card__stars--icon">
                    <use xlink:href="img/sprite.svg#icon-star"></use>
                </svg>
                <svg class="card__stars--icon">
                    <use xlink:href="img/sprite.svg#icon-star"></use>
                </svg>
            </div>
            <p class="card__discount">50%<span class="card__text">OFF</span></p>
            <p class="card__value">
            &#8369;${product.price}
            </p>
        </div>
        <form action="/cart/products" class="cta" method="POST">
            <button class="btn-circle">
                <i class="cta__icon icon-ecommerce-gift"></i>
            </button>
            <input hidden value="${product.id}" name="productId" />
            <button class="btn-circle">
                <i class="cta__icon icon-ecommerce-cart-check"></i>
            </button>
        </form>
        </div>
         `;
    })
    .join('');

  return layout({
    content: `
    <section class="section-">
      <nav class="navbar">
        <div class="navbar-container">
            <div class="navbar-flex">
                <div class="contact-info">
                    <div class="contact-info__text">
                        <svg class="list-items__social-icon">
                            <use xlink:href="img/sprite.svg#icon-phone"></use>
                        </svg>
                         + 1 555 987 6543
                    </div>
                    <div class="contact-info__text">
                        <svg class="list-items__social-icon">
                        <use xlink:href="img/sprite.svg#icon-mail2"></use>
                        </svg>
                    charcoal@style.com
                    </div>
                </div>
            </div>
            <div class="navbar-flex">
                <ul class="list-items">
                    <li class="list-items__item">
                        <svg class="list-items__social-icon">
                          <use xlink:href="img/sprite.svg#icon-facebook"></use>
                        </svg>
                    </li>
                    <li class="list-items__item">
                        <svg class="list-items__social-icon">
                          <use xlink:href="img/sprite.svg#icon-instagram"></use>
                        </svg>
                    </li>
                    <li class="list-items__item">
                        <svg class="list-items__social-icon">
                          <use xlink:href="img/sprite.svg#icon-twitter"></use>
                        </svg>
                    </li>
                    <li class="list-items__item">
                        <svg class="list-items__social-icon">
                          <use xlink:href="img/sprite.svg#icon-youtube"></use>
                        </svg>
                    </li>
                    <li class="list-items__item">
                        <svg class="list-items__social-icon">
                           <use xlink:href="img/sprite.svg#icon-dribbble"></use>
                        </svg>
                    </li>
                </ul>
            </div>
        </div>
      </nav>
      <div class="card-header">
        <h1 class="card-header__text">Charcoal Style</h1>
            <div class="card-header__button">
                <a href="/cart" class="btn "> 
                    <svg class="list-items__social-icon">
                        <use xlink:href="img/sprite.svg#icon-star-full"></use>
                    </svg>
                 Product</a>
                 <a href="/cart" class="btn "> 
                    <svg class="list-items__social-icon">
                        <use xlink:href="img/sprite.svg#icon-cart"></use>
                    </svg>
              Product</a>
            </div>
            <div class="banner">
                <p class="banner__text">Limited Time Offer - Order Today for<span class="banner__price">$99</span></p>
            </div>
            <h4>Features Items</h4>
      </div>
        <div class="card">
            ${renderedProducts}
        </div>
    </section>
    `,
  });
};
