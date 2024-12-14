import React from 'react'
import Home from './Home'

describe('Home Component', () => {
  beforeEach(() => {
    // Mocking the fetch API to simulate the network response
    cy.intercept('GET', '**/frontend-assignment.json', {
      statusCode: 200,
      body: [
        {
          's.no': 1,
          'percentage.funded': '186',
          'amt.pledged': '15823'
        },
        {
          's.no': 2,
          'percentage.funded': '102',
          'amt.pledged': '17906'
        }
      ]
    }).as('getData');
    
    // Mount the Home component
    cy.mount(<Home />);
  });

  it('should show loading state initially', () => {
    // When the page first loads, it should show the "Loading..." text
    cy.get('section').contains('Loading...').should('be.visible');
  });

  it('should display the correct company name', () => {
    // Check that the company name "SaaS Labs" is displayed
    cy.get('.company-name').should('have.text', 'SaaS Labs');
  });

  it('should render DataTable after data is loaded', () => {
    // Ensure that the data fetching process has completed
    cy.wait('@getData');
    
    // Once the data is loaded, the loading state should disappear
    cy.get('section').contains('Loading...').should('not.exist');
    
    // Ensure the DataTable component is rendered and contains data
    cy.get('table').should('exist');
    cy.get('tbody tr').should('have.length', 2); // As we mocked 2 rows of data
    cy.get('tbody tr').eq(0).should('contain.text', '1').and('contain.text', '186').and('contain.text', '15823');
    cy.get('tbody tr').eq(1).should('contain.text', '2').and('contain.text', '102').and('contain.text', '17906');
  });

  it('should display an error message if the fetch fails', () => {
    // Intercept the request and mock an error
    cy.intercept('GET', '**/frontend-assignment.json', {
      statusCode: 500,
      body: { error: 'Something went wrong' }
    }).as('getDataError');
    
    // Reload the Home component to trigger the error
    cy.mount(<Home />);
    
    // Wait for the error response
    cy.wait('@getDataError');
    
    // Check if the error message is displayed
    cy.get('section').contains('Error: Network response was not ok').should('be.visible');
  });

  it('should pass data correctly to DataTable component', () => {
    cy.wait('@getData');
    
    // Ensure that the data is passed to the DataTable component and rendered correctly
    cy.get('tbody tr').eq(0).should('contain.text', '1').and('contain.text', '186').and('contain.text', '15823');
    cy.get('tbody tr').eq(1).should('contain.text', '2').and('contain.text', '102').and('contain.text', '17906');
  });
});