const layout = require('../layout');

module.exports = ({ req }) => {
  return layout({
    content: `<div>
        <form method="POST">
            <input name="email" placeholder="Email"/>
            <input name="password" placeholder="Password"/>
            <input name="passwordConfirmation" placeholder="Confirm Password"/>
            <button>Sign up</button>
        </form>
    </div>`,
  });
};
