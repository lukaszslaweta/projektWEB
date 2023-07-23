import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';


jest.mock('./API', () => ({
  fetchQuizQuestions: jest.fn(() => Promise.resolve([])),
}));

describe('Komponent App', () => {
  it('powinien rozpocząć quiz po kliknięciu przycisku "Start"', async () => {
    const { getByText } = render(<App />);

    const przyciskStartu = getByText('Start');
    fireEvent.click(przyciskStartu);

    // eslint-disable-next-line no-undef
    await waitFor(() => expect(fetchQuizQuestions).toHaveBeenCalledTimes(1));

    expect(getByText('Loading Questions...')).toBeInTheDocument();
  });


  it('powinien sprawdzić odpowiedź użytkownika po wybraniu odpowiedzi', async () => {
    const { getByText, getByTestId } = render(<App />);
    const przyciskStartu = getByText('Start');
    fireEvent.click(przyciskStartu);


    // eslint-disable-next-line no-undef
    await waitFor(() => expect(fetchQuizQuestions).toHaveBeenCalledTimes(1));

    await waitFor(() => expect(getByTestId('question-text')).toBeInTheDocument());

    const przyciskOdpowiedzi = getByTestId('answer-1'); 
    fireEvent.click(przyciskOdpowiedzi);

    expect(getByText('Score: 1')).toBeInTheDocument();
  });

  it('powinien przejść do następnego pytania po kliknięciu przycisku "Next Question"', async () => {
    const { getByText, getByTestId } = render(<App />);
    const przyciskStartu = getByText('Start');
    fireEvent.click(przyciskStartu);

  
    // eslint-disable-next-line no-undef
    await waitFor(() => expect(fetchQuizQuestions).toHaveBeenCalledTimes(1));


    await waitFor(() => expect(getByTestId('question-text')).toBeInTheDocument());


    const przyciskOdpowiedzi = getByTestId('answer-1'); 
    fireEvent.click(przyciskOdpowiedzi);


    const przyciskNastepnego = getByText('Next Question');
    fireEvent.click(przyciskNastepnego);

    await waitFor(() => expect(getByTestId('question-text')).toBeInTheDocument());

    expect(getByText('Score: 1')).toBeInTheDocument();
  });
});
