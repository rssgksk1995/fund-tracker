import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AGDataTable from './AGDataTable';
import '@testing-library/jest-dom';  // For the toBeInTheDocument matcher

describe('AGDataTable Component', () => {
  it('renders correctly with data', async () => {
    const mockData = [
      { sNo: 1, percentagefunded: 50, amtPledged: 1000 },
      { sNo: 2, percentagefunded: 60, amtPledged: 2000 }
    ];

    render(<AGDataTable data={mockData} />);

    // Wait for the rows to render and check for the text inside the table
    await waitFor(() => screen.getByRole('gridcell', { name: '1' }));  // Check gridcell for '1'
    await waitFor(() => screen.getByRole('gridcell', { name: '50' }));  // Check gridcell for '50'
    await waitFor(() => screen.getByRole('gridcell', { name: '1000' }));  // Check gridcell for '1000'
    await waitFor(() => screen.getByRole('gridcell', { name: '2' }));  // Check gridcell for '2'
    await waitFor(() => screen.getByRole('gridcell', { name: '60' }));  // Check gridcell for '60'
    await waitFor(() => screen.getByRole('gridcell', { name: '2000' }));  // Check gridcell for '2000'
  });

  it('renders No Data Available when no data is passed', async () => {
    render(<AGDataTable data={[]} />);

    // Check if "No Data Available" message appears when data is empty
    expect(screen.getByText('No Data Available')).toBeInTheDocument();
  });
});
