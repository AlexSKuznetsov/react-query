import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const generateQueryClient = () => {
  return new QueryClient();
};

export function renderWithQueryClient(ui, client) {
  const queryClient = client ?? generateQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

export const createQueryClientWrapper = () => {
  const queryClient = generateQueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
