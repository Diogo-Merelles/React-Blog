function setupMockServer() {
    cy.setupMockServer("GET", "http://localhost:5000/user", "getUser", 200, [
        {
            firstName: "Update",
            lastName: "Profile",
            email: "profile@gmail.com",
            password: "profile123",
            id: 12,
          },
    ]);
  }
  
  describe("Logout", () => {
    beforeEach(() => {
      setupMockServer();
      cy.login("profile@gmail.com", "profile123")
    });
  
    it("should succesfully change the username and password of a logged in user", () => {
      cy.visit("/userProfile/12");
      cy.url().should("include", "/userProfile/12");
      cy.get("#cy-email").clear()
      cy.get("#cy-email").type("profilechanged@gmail.com");
      cy.get("#cy-email").should("have.value", "profilechanged@gmail.com");
      cy.get("#cy-password").clear()
      cy.get("#cy-password").type("profile1234");
      cy.get("#cy-password").should("have.value", "profile1234");
      cy.get("#cy-confirmChanges").click({force: true});

    });
  });