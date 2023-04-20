function setupMockServer() {
  cy.setupMockServer(
    "GET",
    "http://localhost:5000/user?email=andre@gmail.com",
    "getUser",
    200,
    [
      {
        firstName: "Andre",
        lastName: "Costa",
        email: "andre@gmail.com",
        password: "andre123",
        id: 4,
      },
    ]
  );
}

describe("Login", () => {
  beforeEach(() => {
    setupMockServer();
  })

  it("should log in properly and redirect to home", () => {
    cy.visit("/login");
    cy.url().should("include", "/login");
    cy.get("#email-input").type("andre@gmail.com");
    cy.get("#email-input").should("have.value", "andre@gmail.com");
    cy.get("#password-input").type("andre123");
    cy.get("#password-input").should("have.value", "andre123");
    cy.get("button[type=submit]").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});

