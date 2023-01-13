import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../services';
import { addScore } from '../redux/actions';
import Header from '../components/Header';

class Game extends Component {
  state = {
    requestQuestions: [],
    currentQuestion: 0,
    loading: true,
    timedOut: false,
    timer: 30,
    someButtonClicked: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const shuffleNumber = 0.5;
    const fetchedQuestions = await fetchQuestions();
    const errorCode = 3;
    if (fetchedQuestions.response_code === errorCode) {
      localStorage.removeItem('token');
      history.push('/');
    }
    fetchedQuestions.results.forEach((questionComponent) => {
      const answers = [
        ...questionComponent.incorrect_answers,
        questionComponent.correct_answer,
      ];

      const answersObject = answers.map((answer, index) => ({ text: answer, index }));
      questionComponent.answers = answersObject.sort(() => Math.random() - shuffleNumber);
    });

    this.setState(
      {
        requestQuestions: fetchedQuestions.results,
        loading: false,
      },
      this.setTimer,
    );
  }

  async setTimer() {
    const s = 1000;
    setInterval(() => {
      const { timer } = this.state;
      if (timer === 0) {
        this.setState({ timedOut: true });
      } else {
        this.setState({ timer: timer - 1 });
      }
    }, s);
  }

  hendleNextClick = () => {
    const { history } = this.props;
    const { currentQuestion } = this.state;
    const maxQuestions = 4;
    if (currentQuestion === maxQuestions) {
      history.push('/feedback');
    }
    this.setState((state) => ({
      currentQuestion: state.currentQuestion + 1,
      someButtonClicked: false,
      timedOut: false,
      timer: 30,
    }));
  };

  handleClick = ({ target }) => {
    const { dispatch, score } = this.props;
    const { requestQuestions, currentQuestion, timer } = this.state;

    const buttons = document.querySelectorAll('.answersButton');
    const buttonsArray = [...buttons];
    buttonsArray.map((button) => {
      if (button.getAttribute('data-testid') === 'correct-answer') {
        button.style.border = '3px solid rgb(6, 240, 15)';
      } else {
        button.style.border = '3px solid red';
      }
      return null;
    });

    if (target.innerText === requestQuestions[currentQuestion].correct_answer) {
      const easy = 1;
      const medium = 2;
      const hard = 3;
      const baseScore = 10;

      let difficultyLevel;
      if (requestQuestions[currentQuestion].difficulty === 'easy') {
        difficultyLevel = easy;
      }
      if (requestQuestions[currentQuestion].difficulty === 'medium') {
        difficultyLevel = medium;
      }
      if (requestQuestions[currentQuestion].difficulty === 'hard') {
        difficultyLevel = hard;
      }
      const totalScore = score + (baseScore + timer * difficultyLevel);
      dispatch(addScore(totalScore));
    }
    this.setState({
      someButtonClicked: true,
    });
  };

  render() {
    const { requestQuestions, currentQuestion, loading, timedOut,
      someButtonClicked } = this.state;
    const questionComponent = requestQuestions[currentQuestion];

    return (
      <div>
        <Header />
        {
          loading ? <h1>carregando...</h1> : (
            <main>
              <h4 data-testid="question-category">
                {
                  questionComponent.category
                }
              </h4>
              <p data-testid="question-text">
                {
                  questionComponent.question
                }
              </p>
              <div data-testid="answer-options">
                {
                  questionComponent.answers.map((answers, index) => (
                    <button
                      key={ index }
                      type="button"
                      data-testid={ questionComponent.answers.length - 1 === answers.index
                        ? 'correct-answer' : `wrong-answer-${answers.index}` }
                      disabled={ timedOut }
                      onClick={ this.handleClick }
                      className="answersButton"
                    >
                      {answers.text}
                    </button>
                  ))
                }
              </div>
              {someButtonClicked && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.hendleNextClick }
                >
                  Next
                </button>)}
            </main>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Game.propTypes = {
  score: PropTypes.number.isRequired,
  history: PropTypes.shape(PropTypes.any.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Game);
