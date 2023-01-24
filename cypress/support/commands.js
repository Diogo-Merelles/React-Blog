import "@testing-library/cypress/add-commands";

Cypress.Commands.add(
  "setupMockServer",
  (httpMethod, url, alias, statusCode, response) => {
    cy.intercept(httpMethod, url, {
      statusCode: statusCode,
      body: response,
    }).as(alias);
  }
);
