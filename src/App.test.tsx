import { render, screen } from '@testing-library/react';
import renderApp from './renderApp';

test('renders learn react link', () => {
  render(<>{renderApp()}</>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
