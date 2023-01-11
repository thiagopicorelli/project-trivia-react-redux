import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../trivia.png';

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

  handleClickPlay = async () => {
    const { history } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await response.json();
    localStorage.setItem('token', json.token);
    history.push('/game');
  };

  render() {
    const { nameInput, emailInput, isDisabled } = this.state;

    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <br />
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
            onClick={ () => this.handleClickPlay() }
          >
            Play
          </button>
        </div>
      </header>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape(PropTypes.any.isRequired).isRequired,
};

export default Login;
