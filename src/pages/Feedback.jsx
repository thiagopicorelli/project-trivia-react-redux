import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  feedbackMessage = () => {
    const { assertions } = this.props;
    const maxCorrectPhrase = 3;

    if (assertions < maxCorrectPhrase) {
      return 'Could be better...';
    } return 'Well Done!';
  };

  render() {
    return (
      <div>
        FeedBack
        <p data-testid="feedback-text">{ this.feedbackMessage() }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
