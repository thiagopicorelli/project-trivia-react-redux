import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Ranking from '../pages/Ranking';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

const ranking = [
  {
    name: 'group17',
    assertions: 4,
    score: 356,
    gravatarEmail: 'sffsfgfdg',
  },
  {
    name: 'felipe',
    assertions: 5,
    score: 500,
    gravatarEmail: 'felipekeudhevegetgrbdfdscs',
  },
]

localStorage.setItem('ranking', JSON.stringify(ranking))

describe('testa a page Ranking', () => {
  test('se o título é renderizado', () => {
    renderWithRouterAndRedux(<Ranking />)
    const titulo = screen.getByRole('heading', {  name: /ranking/i})
    expect(titulo).toBeInTheDocument();
  }); 

  
  test('se ao clicar no botão play again, home e renderizado', async () => {
      const { history } = renderWithRouterAndRedux(<Ranking />);
      const btnPlayAgain = screen.getByRole('button', {  name: /play again/i});
      userEvent.click(btnPlayAgain);
      expect(history.location.pathname).toBe('/');
    });

    test('se o botão play again é renderizado', () => {
      renderWithRouterAndRedux(<Ranking />)
      const btnPlayAgain = screen.getByRole('button', {  name: /play again/i})
      expect(btnPlayAgain).toBeInTheDocument();
    }); 


  test('se o nome do jogador e renderizado', async () => {
    renderWithRouterAndRedux(<Ranking />)
    const playerName = screen.getByTestId('player-name-2')
    expect(playerName).toBeInTheDocument();
  });

  test('se pontuação do jogador e renderizado ', () => {
    renderWithRouterAndRedux(<Ranking />)

    const playerScore = screen.getByTestId('player-score-2')
    expect(playerScore).toBeInTheDocument();
  });
});