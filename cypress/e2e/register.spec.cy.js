function setupMockServer() {
    cy.setupMockServer(
      "POST",
      "http://localhost:5000/user?email=test@gmail.com",
      "createUser",
      201,
      [
        {
          firstName: "TestFirst",
          lastName: "TestLast",
          email: "test@gmail.com",
          password: "test1234"
        },
      ]
    );
  }

  describe("Register", () => {
    beforeEach(() => {
      setupMockServer();
    })
  
    it("should register properly and redirect to login page", () => {
      cy.visit("/register");
      cy.url().should("include", "/register");
      cy.get("#firstName-input").type("TestFirst");
      cy.get("#firstName-input").should("have.value", "TestFirst");
      cy.get("#lastName-input").type("TestLast");
      cy.get("#lastName-input").should("have.value", "TestLast");
      cy.get("#email-input").type("test@gmail.com", {force: true});
      cy.get("#email-input").should("have.value", "test@gmail.com");
      cy.get("#password-input").type("test1234", {force: true});
      cy.get("#password-input").should("have.value", "test1234");
      cy.get("button[type=submit]").click({force: true});
    });
  });