import { ADD_EMAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
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
  default:
    return state;
  }
};

export default player;
