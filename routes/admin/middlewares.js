const { validationResult } = require('express-validator');

module.exports = {
  handleErrors(templateFunc) {
    return (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors);

      if (!errors.isEmpty()) {
        return res.send(templateFunc({ errors }));
      }

      // This function will execute once the data that is pass in is correct
      next();
    };
  },
  // If user is not login or does not create an accout
  // User can't access products and will be redirect to sign in
  requireAuth(req, res, next) {
    if (!req.session.userID) {
      return res.redirect('/signin');
    }

    next();
  },
};
