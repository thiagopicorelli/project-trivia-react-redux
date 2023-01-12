import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../services';

class Game extends Component {
  state = {
    requestQuestions: [],
    currentQuestion: 0,
    loading: true,
    timedOut: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const fetchedQuestions = await fetchQuestions();
    const errorCode = 3;
    if (fetchedQuestions.response_code === errorCode) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      requestQuestions: fetchedQuestions.results,
      loading: false,
    }, this.setTimer);
  }

  async setTimer() {
    const questionTimer = 30000;
    setTimeout(() => this.setState({
      timedOut: true,
      // Colocar aqui a resposta como a errada
    }), questionTimer);
  }

  render() {
    const { email, name, score } = this.props;
    const { requestQuestions, currentQuestion, loading, timedOut } = this.state;
    const questionComponent = requestQuestions[currentQuestion];
    const hash = MD5(email).toString();
    const shuffleNumber = 0.5;
    let answersArray = [];
    if (!loading) {
      answersArray = [...questionComponent.incorrect_answers,
        questionComponent.correct_answer];
    }

    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="imagem de usuario"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
        {
          loading ? <h1>carregando...</h1> : (
            <main>
              <h4 data-testid="question-category">
                {
                  questionComponent.category
                }
              </h4>
              <p data-testid="question-text">
                {
                  questionComponent.question
                }
              </p>
              <div data-testid="answer-options">
                {
                  answersArray
                    .map((answers, index) => (
                      <button
                        key={ index }
                        type="button"
                        data-testid={ answersArray.length - 1 === index
                          ? 'correct-answer' : `wrong-answer-${index}` }
                        disabled={ timedOut }
                      >
                        {answers}
                      </button>
                    )).sort(() => Math.random() - shuffleNumber)
                }
              </div>
            </main>
          )
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Game.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape(PropTypes.any.isRequired).isRequired,
};

export default connect(mapStateToProps)(Game);
