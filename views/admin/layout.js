module.exports = ({ content }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <base href="/">
      <link rel="stylesheet" href="css/main.css" />
      <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
      <title>Charcoal Clothes | Choose your fashion and style</title>
    </head>
    <body>
      ${content}
    </body>
  </html>
    `;
};
