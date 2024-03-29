const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/ecomm/products');
const cartsRouter = require('./routes/ecomm/carts');

const app = express();

// Express will look the content on public directory every single time
// to check for style sheet that is being request and send it back
// who made the request.The main.css was link to layout.js
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['mkkdjdd77d00????""~~sjsjjs//HHIASmc*****'],
  })
);
app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);

// Telling express to watch incoming request on port 3000
app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
