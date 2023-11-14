import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';

test('renderiza Home corretamente', async () => {
  render(<Home />);


  await waitFor(() => {
    expect(screen.getByText(/MKS/i)).toBeInTheDocument();
  });


  
});
