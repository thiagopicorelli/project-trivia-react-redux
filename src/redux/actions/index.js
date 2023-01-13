// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_SCORE = 'ADD_SCORE';

// ACTIONS CREATORS
export const addEmail = (email, name) => ({
  type: ADD_EMAIL,
  email,
  name,
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  score,
});
