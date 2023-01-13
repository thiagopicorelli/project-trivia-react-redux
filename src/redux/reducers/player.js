import { ADD_EMAIL, ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL: {
    return ({
      ...state,
      gravatarEmail: action.email,
      name: action.name,
      score: 0,
    });
  }
  case ADD_SCORE: {
    return ({
      ...state,
      assertions: state.assertions + 1,
      score: action.score,
    });
  }
  default:
    return state;
  }
};

export default player;
