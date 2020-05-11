module.exports = ({ content }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
    <body>
    
    <!--String Interpolation 
    It will throw the content of signin or signup 
    content depending on what is being called-->
        ${content}
    </body>
</html>
    `;
};
