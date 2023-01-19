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

Cypress.Commands.add("login", (userId = 1) => {
  window.localStorage.setItem(
    "userData",
    JSON.stringify({
      firstName: "Andre",
      lastName: "Costa",
      email: "andre@gmail.com",
      password: "andre123",
      id: userId,
    })
  );
});
