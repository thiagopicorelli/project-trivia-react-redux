import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('some tests in the Login component', () => {
    it('has name and email inputs on the screen', () => {
      renderWithRouterAndRedux(<App />);
  
      const nameInputEl = screen.getByPlaceholderText(/nome/i);
      const emailInputEl = screen.getByPlaceholderText(/email/i);
      expect(nameInputEl).toBeInTheDocument();
      expect(emailInputEl).toBeInTheDocument();
    });
    it('has a Play button and it starts disabled', () => {
        renderWithRouterAndRedux(<App />);
    
        const playButtonEl = screen.getByRole('button', {
          name: /Play/i,
        });
        expect(playButtonEl).toBeInTheDocument();
        expect(playButtonEl).toBeDisabled();
      });
    it('changes disable status when we type at two inputs, after that when we click it will be redirected to game page', async () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const nameInputEl = screen.getByPlaceholderText(/nome/i);
        const emailInputEl = screen.getByPlaceholderText(/email/i);
        const playButtonEl = screen.getByRole('button', {
            name: /Play/i,
          });

        userEvent.type(nameInputEl, 'aqui');
        userEvent.type(emailInputEl, 'aqui');

        expect(playButtonEl).not.toBeDisabled();

        userEvent.click(playButtonEl);

        await waitFor(() => {
            const { pathname } = history.location;
            expect(pathname).toBe('/game');
        })
    })
    it('has a config button on the screen and the button works properly', async () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const configButtonEl = screen.getByRole('button', {
            name: /settings/i,
          });

        expect(configButtonEl).toBeInTheDocument();
        
        userEvent.click(configButtonEl);

        await waitFor(() => {
            const { pathname } = history.location;
            expect(pathname).toBe('/config');
        })
    })
}
)