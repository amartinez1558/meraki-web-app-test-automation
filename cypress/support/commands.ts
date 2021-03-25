// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-wait-until';

Cypress.Commands.add('storeSessionCookie', () => {
  cy.getCookie('rack.session')
    .should('have.property', 'value')
    .then(value => {
      Cypress.env('session', value)
    })
})

Cypress.Commands.add('applySessionCookie', () => {
  cy.setCookie('rack.session', Cypress.env('session'))
})

Cypress.Commands.add('clearSessionCookie', () => {
  cy.setCookie('rack.session', '')
})

Cypress.Commands.add('validateIpAddress', { prevSubject: true }, (prevTextSubject) => {
  const ipValidation = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  cy.wrap(prevTextSubject)
    .should('match', ipValidation)
})