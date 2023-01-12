// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';

// ACTIONS CREATORS
export const addEmail = (email, name) => ({
  type: ADD_EMAIL,
  email,
  name,
});
