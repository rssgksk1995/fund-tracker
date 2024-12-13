// src/Home.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';  // Import your Home component
import '@testing-library/jest-dom';  // For the toBeInTheDocument matcher

// Mock the fetch call
global.fetch = jest.fn();

describe('Home Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('displays loading state initially', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    render(<Home />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network response was not ok'));

    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText('Error: Network response was not ok')).toBeInTheDocument();
    });
  });

  it('renders the table after data is fetched', async () => {
    const mockData = [
      { 's.no': 1, 'percentage.funded': 50, 'amt.pledged': 1000 },
      { 's.no': 2, 'percentage.funded': 60, 'amt.pledged': 2000 }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    render(<Home />);
    // Wait for the data to be loaded
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    // Check that the table displays the correct data
    await waitFor(() => {
        expect(screen.getByText('50')).toBeInTheDocument();  // Checking if 50 is displayed
        expect(screen.getByText('60')).toBeInTheDocument();  // Checking if 60 is displayed
      });
  });
});
