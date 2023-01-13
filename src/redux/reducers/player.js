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
    });
  }
  case ADD_SCORE: {
    return ({
      ...state,
      score: action.score,
      assertions: state.assertions + 1,
    });
  }
  default:
    return state;
  }
};

export default player;
