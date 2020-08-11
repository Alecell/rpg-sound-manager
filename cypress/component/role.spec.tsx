import React from 'react';
import { mount } from 'cypress-react-unit-test';
import Header from '../../src/components/Header';

describe('HelloWorld component', () => {
  it('works', () => {
    mount(<Header />);
    // now use standard Cypress commands
    cy.contains('Hello World!').should('be.visible');
  });
});
