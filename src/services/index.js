export const fetchQuestions = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const result = await response.json();
  return result;
};

export const qualquercoisa = () => {

};
