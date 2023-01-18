import React from "react";
import Feedback from "../pages/Feedback";
import { screen, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

const initialEntries = '/feedback';
const initialState = {
  player: {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  }
};

describe('testa a tela de Feedbacks', () => {
    test('se os elementos sao renderizados na tela', () => {
       const { history } = renderWithRouterAndRedux(<Feedback/>);

       const feedback = screen.getByTestId('feedback-text');
       const pontuacaoTotal = screen.getByTestId('feedback-total-score');
       const btnPlayAgain = screen.getByRole('button', { name: /play again/i});
       
       const totalAcertos = screen.getByTestId('feedback-total-question');

       const { pathname } = history.location;
        expect(pathname).toBe('/');

       expect(feedback).toBeInTheDocument();
       expect(pontuacaoTotal).toBeInTheDocument();
       expect(btnPlayAgain).toBeInTheDocument();
       expect(btnranking).toBeInTheDocument();
       expect(totalAcertos).toBeInTheDocument();
    });

    test('se existem 2 botoes renderizados na tela', () => {
        renderWithRouterAndRedux(<Feedback/>);
 
        const btnQtd = screen.getAllByRole('button');
      
        expect(btnQtd).toHaveLength(2);
    });


    test('se ao clicar no botao play again, home e renderizada', async () => {
        const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);
        const btnPlayAgain = screen.getByTestId('btn-play-again');
        expect(btnPlayAgain).toBeInTheDocument(); 
    
        userEvent.click(btnPlayAgain);
    
        await waitFor(() => {
          expect(history.location.pathname).toBe('/');
        });

    });
       
    test('se feedback renderiza "Could be better"', () => {
        const { getByTestId } = renderWithRouterAndRedux(<Feedback/>);
    
        const message = getByTestId('feedback-text');
         expect(message).toBeInTheDocument();
    });

    test('se ao clicar no botao play again, home e renderizada', async () => {
        const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);
        const btnPlayAgain = screen.getByTestId('btn-play-again');
        expect(btnPlayAgain).toBeInTheDocument(); 
    
        userEvent.click(btnPlayAgain);
    
        await waitFor(() => {
          expect(history.location.pathname).toEqual('/');
        });
    });    

    test('se feedback renderiza "Could be better"', () => {
       const { getByTestId } = renderWithRouterAndRedux(<Feedback/>);
    
        const message = getByTestId('feedback-text');
          expect(message).toBeInTheDocument();
    });

    test('se ao clicar no botão de Ranking a página de Ranking e renderizada', async () => {
        const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);
        const btnranking = screen.getByTestId('btn-ranking');
        expect(btnranking).toBeInTheDocument(); 
        
        userEvent.click(btnranking);
        
        await waitFor(() => {
        expect(history.location.pathname).toEqual('/ranking');
        });
    });
 });

