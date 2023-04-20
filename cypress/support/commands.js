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

Cypress.Commands.add("login", (username, password) => {
  cy.visit("/login");
  cy.url().should("include", "/login");
  cy.get("#email-input").type(username);
  cy.get("#password-input").type(password);
  cy.get("button[type=submit]").click();
  cy.url().should("eq", "http://localhost:3000/");
});
