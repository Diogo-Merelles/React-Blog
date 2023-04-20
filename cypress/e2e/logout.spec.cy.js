function setupMockServer() {
    cy.setupMockServer("GET", "http://localhost:5000/user", "getUser", 200, [
        {
            firstName: "Andre",
            lastName: "Costa",
            email: "andre@gmail.com",
            password: "andre123",
            id: 4,
          },
    ]);
  }
  
  describe("Logout", () => {
    beforeEach(() => {
      setupMockServer();
      cy.login("andre@gmail.com", "andre123")
    });
  
    it("should succesfully logout", () => {
      cy.visit("/");
      cy.url().should("include", "/");
      cy.get("#cy-logout").click({force: true});
      cy.contains("Logout").click({force: true});

    });
  });
  