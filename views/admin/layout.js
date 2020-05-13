module.exports = ({ content }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=h1, initial-scale=1.0" />
      <link rel="stylesheet" href="css/main.css" />
      <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
      <title>Charcoal Clothes | Choose your fashion and style</title>
    </head>
    <body>
      <section class="section-auth">
        <div class="container">
          <div class="content">
           <img src="img/logo-2-white.png" alt="logo" class="content__logo">
            <div class="content__heading">
              Welcome to Charcoal
            </div>
            <div class="content__sub-heading">
             We make an awesome style for your fashion
            </div>
            <div class="content__legal">
              &copy; 2020 by Charcoal. All rights reserved
            </div>
          </div>
             ${content}
        </div>
      </section>
    </body>
  </html>
    `;
};
