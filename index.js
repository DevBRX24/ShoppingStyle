const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['mkkdjdd77d00????""~~sjsjjs//HHIASmc*****'],
  })
);
app.use(authRouter);

// Telling express to watch incoming request on port 3000
app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
