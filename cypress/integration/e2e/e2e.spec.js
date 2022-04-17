/// <reference types="cypress" />


describe('functionalities', () => {
  beforeEach(() => {
    cy.visit('localhost:3000', {
      onBeforeLoad (win) {
        cy.spy(win, 'fetch')
      },
    });
    cy.wait(5000);
  });

  it('fetches data from the Ubiquiti resource', () => {
    cy.window().its('fetch').should('be.calledWith', 'https://static.ui.com/fingerprint/ui/public.json')
  })

  it('displays a full list of items by default', () => {
    cy.get('.ListOfAll--OneDeviceRow').should('have.length.above', 0);
  })

  it('after search, all displayed elements contain the search term, and the search is case-insensitive', () => {
    cy.get('.Navigation--search').type('aircube');
    cy.get('.ListOfAll--OneDeviceRow').each(($el) => {
      expect($el.text().toLowerCase()).to.include('aircube');
    });
  })

  it('filter by line name', () => {
    cy.get('.Filter--Button').click();
    cy.wait(100);
    cy.get('.Filter--Bar--Term').first().click({force: true});
    cy.wait(100);
    cy.get('.Filter--Bar--Term').first().invoke('text').then((text) => {
      text = text.toLowerCase().split(/[^a-z]/).join('')
      cy.get('.LineCol').each(($el) => {
        let compare = ($el.text()).toLowerCase().split(/[^a-z]/).join('');
        expect(text).to.equal(compare);
      });
    })
  })

})
