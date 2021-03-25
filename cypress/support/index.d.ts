// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {

  interface Chainable<Subject> {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
    */

    // Session Cookie Functions
    storeSessionCookie(): void
    applySessionCookie(): void
    clearSessionCookie(): void

    // Validators
    validateIpAddress(): Chainable<any>
  }
}