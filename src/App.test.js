import { screen, waitFor } from '@testing-library/react';
import App from './App';
import { renderWithQueryClient } from './test-utils/index';

test('renders loading text', () => {
  renderWithQueryClient(<App />);
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});

test('response data length equal 10', async () => {
  renderWithQueryClient(<App />);
  const todoItems = await waitFor(() => screen.getAllByTestId('todo-item'));
  expect(todoItems).toHaveLength(10);
});
