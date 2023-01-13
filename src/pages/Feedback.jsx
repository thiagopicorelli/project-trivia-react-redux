import React, { Component } from 'react';

class Feedback extends Component {
  render() {
    return (
      <div>
        FeedBack
        <p data-testid="feedback-text">Olá</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
