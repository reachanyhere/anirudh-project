import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './Home';

// Mock the fetch API
global.fetch = jest.fn();

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for tests
      },
    },
  });
};

// Wrapper component to provide the QueryClient
const renderWithClient = (ui, client) => {
  return render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
  );
};

const mockStarWarsData = {
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
    },
    { name: 'C-3PO', height: '167', mass: '75', hair_color: 'n/a' },
  ],
};

describe('Home Component', () => {
  let queryClient;

  beforeEach(() => {
    // Clear mocks and query cache before each test
    fetch.mockClear();
    queryClient = createTestQueryClient();
  });

  test('renders loading state initially', () => {
    // Mock a pending promise
    fetch.mockImplementationOnce(() => new Promise(() => {}));
    renderWithClient(<Home />, queryClient);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state on fetch failure', async () => {
    // Mock a failed fetch
    fetch.mockRejectedValueOnce(new Error('Network response was not ok'));
    renderWithClient(<Home />, queryClient);
    const errorElement = await screen.findByText(
      /Error fetching data: Network response was not ok/,
    );
    expect(errorElement).toBeInTheDocument();
  });

  test('renders characters on successful fetch', async () => {
    // Mock a successful fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStarWarsData,
    });
    renderWithClient(<Home />, queryClient);
    expect(
      await screen.findByText('Luke Skywalker | 172 | 77 | blond'),
    ).toBeInTheDocument();
    expect(screen.getByText('C-3PO | 167 | 75 | n/a')).toBeInTheDocument();
  });

  test('allows adding a new character', async () => {
    // Mock a successful fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStarWarsData,
    });
    renderWithClient(<Home />, queryClient);

    // Wait for initial data to load
    await screen.findByText(/Luke Skywalker/);

    // Fill and submit the form
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'R2-D2' },
    });
    fireEvent.change(screen.getByPlaceholderText('Height'), {
      target: { value: '96' },
    });
    fireEvent.change(screen.getByPlaceholderText('Mass'), {
      target: { value: '32' },
    });
    fireEvent.change(screen.getByPlaceholderText('Hair Color'), {
      target: { value: 'n/a' },
    });
    fireEvent.click(screen.getByText('Add Character'));

    // Check that the new character is in the table
    expect(await screen.findByText(/R2-D2/)).toBeInTheDocument();
  });

  test('clears input fields after adding a character', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStarWarsData,
    });
    renderWithClient(<Home />, queryClient);
    await screen.findByText(/Luke Skywalker/);

    const nameInput = screen.getByPlaceholderText('Name');
    fireEvent.change(nameInput, { target: { value: 'R2-D2' } });
    fireEvent.change(screen.getByPlaceholderText('Height'), {
      target: { value: '96' },
    });
    fireEvent.change(screen.getByPlaceholderText('Mass'), {
      target: { value: '32' },
    });
    fireEvent.change(screen.getByPlaceholderText('Hair Color'), {
      target: { value: 'n/a' },
    });
    fireEvent.click(screen.getByText('Add Character'));

    await screen.findByText(/R2-D2/);

    expect(nameInput.value).toBe('');
  });
});
