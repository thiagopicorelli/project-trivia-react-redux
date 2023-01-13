import { ADD_EMAIL, ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
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
    });
  }
  default:
    return state;
  }
};

export default player;
