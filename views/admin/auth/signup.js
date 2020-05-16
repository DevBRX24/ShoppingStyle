const layout = require('../layout');
const { getError } = require('../../helper');

module.exports = ({ req, errors }) => {
  return layout({
    content: `
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
      </div>
    </section>
    `,
  });
};
