import React, { Component } from 'react';

class Login extends Component {
  state = {
    nameInput: '',
    emailInput: '',
    isDisabled: true,
  };

  loginValidation = () => {
    const { nameInput, emailInput } = this.state;
    const nameIsValid = nameInput !== '';
    const emailIsValid = emailInput !== '';

    this.setState({
      isDisabled: !(nameIsValid && emailIsValid),
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.loginValidation);
  };

  render() {
    const { nameInput, emailInput, isDisabled } = this.state;

    return (
      <div>
        <label htmlFor="nameInput">
          <input
            type="text"
            id="nameInput"
            name="nameInput"
            data-testid="input-player-name"
            placeholder="Nome"
            value={ nameInput }
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <label htmlFor="emailInput">
          <input
            type="email"
            id="emailInput"
            name="emailInput"
            data-testid="input-gravatar-email"
            placeholder="Email"
            value={ emailInput }
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <button
          type="button"
          disabled={ isDisabled }
          data-testid="btn-play"
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
