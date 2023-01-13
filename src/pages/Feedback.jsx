import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
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
};

export default connect(mapStateToProps)(Feedback);
