const layout = require('../layout');
const { getError } = require('../../helper');

module.exports = ({ req, errors }) => {
  return layout({
    content: `
    <div class="content">
      <form class="form" method="POST">
        <div class="form__text">
          <span class="form__span">Create </span> an account to manage
          all the services and explore our tools.
        </div>
        <div class="form__group">
          <input
            type="text"
            name="email"
            id="email"
            class="form__input"
            placeholder="Email Address"
          />
          <label for="email" class="form__label">Email Address</label>
          <div class="form__error">${getError(errors, 'email')}</div>
        </>
        <div class="form__group">
          <input
            type="password"
            name="password"
            id="password"
            class="form__input"
            placeholder="Password"
          />
          <label for="password" class="form__label">Password</label>
          <div class="form__error">${getError(errors, 'password')}</div>
        </div>
        <div class="form__group">
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            class="form__input"
            placeholder="ConfirmPassword"
          />
          <label for="passwordConfimation" class="form__label"
          >Confirm Password</label
        >
        <div class="form__error">${getError(
          errors,
          'passwordConfirmation'
        )}</div>
        </div>
        <button class="btn btn--violet">Sign up</button>
      </form>
    </div>
    `,
  });
};
