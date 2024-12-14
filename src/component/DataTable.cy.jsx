import React from 'react'
import DataTable from './DataTable'

describe('DataTable', () => {
  const mockData = [
    { sNo: 1, percentagefunded: '186', amtPledged: '15823' },
    { sNo: 2, percentagefunded: '8', amtPledged: '6859' },
    { sNo: 3, percentagefunded: '102', amtPledged: '17906' },
    { sNo: 4, percentagefunded: '191', amtPledged: '67081' },
    { sNo: 5, percentagefunded: '34', amtPledged: '32772' },
    { sNo: 6, percentagefunded: '114', amtPledged: '2065' },
    { sNo: 7, percentagefunded: '5778', amtPledged: '577844' },
  ];

  // Load the page and component
  beforeEach(() => {
    cy.mount(<DataTable data={mockData} />);
  });

  it('should render table headers correctly', () => {
    cy.get('th').eq(0).should('have.text', 'S. No.');
    cy.get('th').eq(1).should('have.text', 'Percentage funded');
    cy.get('th').eq(2).should('have.text', 'Amt. Pledged');
  });

  it('should render first 5 rows correctly', () => {
    // Check that the first 5 rows are rendered
    cy.get('tbody tr').should('have.length', 5);
    cy.get('tbody tr').eq(0).should('contain.text', '1').and('contain.text', '186').and('contain.text', '15823');
    cy.get('tbody tr').eq(1).should('contain.text', '2').and('contain.text', '8').and('contain.text', '6859');
    cy.get('tbody tr').eq(2).should('contain.text', '3').and('contain.text', '102').and('contain.text', '17906');
    cy.get('tbody tr').eq(3).should('contain.text', '4').and('contain.text', '191').and('contain.text', '67081');
    cy.get('tbody tr').eq(4).should('contain.text', '5').and('contain.text', '34').and('contain.text', '32772');
  });

  it('should correctly show the page number as "Page 1"', () => {
    cy.get('.pagination span').should('have.text', 'Page 1');
  });

  it('should navigate to the next page', () => {
    // Click Next button to go to page 2
    cy.get('.pagination button').contains('Next').click();

    // Check that the page number updates
    cy.get('.pagination span').should('have.text', 'Page 2');

    // Verify the next set of rows (rows 6-10) are rendered
    cy.get('tbody tr').should('have.length', 2);
    cy.get('tbody tr').eq(0).should('contain.text', '6').and('contain.text', '114').and('contain.text', '2065');
    cy.get('tbody tr').eq(1).should('contain.text', '7').and('contain.text', '5778').and('contain.text', '577844');
  });

  it('should navigate to the previous page', () => {
    // First, go to page 2
    cy.get('.pagination button').contains('Next').click();
    cy.get('.pagination span').should('have.text', 'Page 2');

    // Then click Prev to go back to page 1
    cy.get('.pagination button').contains('Prev').click();
    cy.get('.pagination span').should('have.text', 'Page 1');
  });

  it('should disable the Prev button on the first page', () => {
    cy.get('.pagination button').contains('Prev').should('be.disabled');
  });

  it('should disable the Next button on the last page', () => {
    // Navigate to the last page
    const totalPages = Math.ceil(mockData.length / 5);
    for (let i = 1; i < totalPages; i++) {
      cy.get('.pagination button').contains('Next').click();
    }
    // The Next button should be disabled on the last page
    cy.get('.pagination button').contains('Next').should('be.disabled');
  });

  it('should display "No Data Available" if no rows are passed', () => {
    cy.mount(<DataTable data={[]} />);
    cy.get('tbody tr').should('have.length', 1);
    cy.get('tbody tr td').should('have.text', 'No Data Available');
  });

});

