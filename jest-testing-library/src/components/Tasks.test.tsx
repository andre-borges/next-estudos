import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import Tasks from './Tasks';

import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

describe('Tasks Component', () => {
  const worker = setupServer(
    http.get('https://jsonplaceholder.typicode.com/todos', async (info) => {
      return HttpResponse.json([
        { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
      ]);
    })
  );

  beforeAll(() => {
    worker.listen();
  });

  beforeEach(() => {
    worker.resetHandlers();
  });

  it('should fetch and show tasks on button click', async () => {
    render(<Tasks />);

    const button = screen.getByText(/get tasks from api/i);

    fireEvent.click(button);

    await screen.findByText('delectus aut autem');
  });

  it('should show error message on fetch error', async () => {
    worker.use(
      http.get('https://jsonplaceholder.typicode.com/todos', async (res) => {
        return HttpResponse.json(null, {
          status: 500,
          statusText: 'Request failed with status code 500',
        });
      })
    );

    render(<Tasks />);

    const button = screen.getByText(/get tasks from api/i);

    fireEvent.click(button);

    await screen.findByText('Request failed with status code 500');
  });
});
