import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    const { name, score, email } = this.props;
    const hash = MD5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;
    const playerRanking = {
      name,
      score,
      picture,
    };
    if (localStorage.getItem('ranking') === null) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
    const playersArray = JSON.parse(localStorage.getItem('ranking'));
    const ranking = [...playersArray, playerRanking];
    const orderedPlayers = ranking.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(orderedPlayers));
  }

  feedbackMessage = () => {
    const { assertions } = this.props;
    const maxCorrectPhrase = 3;

    if (assertions < maxCorrectPhrase) {
      return 'Could be better...';
    } return 'Well Done!';
  };

  render() {
    const { history, score, assertions } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{ this.feedbackMessage() }</p>
        <p data-testid="feedback-total-score">{score}</p>
        <p
          data-testid="feedback-total-question"
        >
          {assertions}
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  history: PropTypes.shape(PropTypes.any.isRequired).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
