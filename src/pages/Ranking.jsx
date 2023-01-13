import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        {
          ranking.map((player, index) => (
            <div key={ index }>
              <img
                src={ player.picture }
                alt="imagem de jogador"
              />
              <p data-testid={ `player-name-${index}` }>
                {player.name}
              </p>
              <p data-testid={ `player-score-${index}` }>
                {player.score}
              </p>
            </div>))
        }
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape(PropTypes.any.isRequired).isRequired,
};

export default connect()(Ranking);
