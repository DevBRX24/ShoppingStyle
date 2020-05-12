const layout = require('../layout');
const { getError } = require('../../helper');

module.exports = ({ req, errors }) => {
  return layout({
    content: `<div>
        <form method="POST">
            <input name="email" placeholder="Email"/>
            ${getError(errors, 'email')}
            <input  name="password" placeholder="Password"/>
            ${getError(errors, 'password')}
            <input  name="passwordConfirmation" placeholder="password confirmation" />
            ${getError(errors, 'passwordConfirmation')}
            <button>Sign up</button>
        </form>
    </div>`,
  });
};
