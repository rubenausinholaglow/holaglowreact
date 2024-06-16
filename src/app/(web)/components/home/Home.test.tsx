import { render, screen } from '@testing-library/react';
import Home from 'app/(web)/components/home/Home';

it('renders text', () => {
  render(<Home />);

  const myElement = screen.getByText('Medicina estética para cuidar tu piel');

  expect(myElement).toBeInTheDocument();
});
