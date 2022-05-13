import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Please/i);
  expect(linkElement).toBeInTheDocument();
});
