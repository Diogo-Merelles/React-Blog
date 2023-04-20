function setupMockServer() {
    cy.setupMockServer("POST", "http://localhost:5000/user", "getUser", 200, [
      {
        title: "Title About food - Edited",
        description: "Some description about food, very intersting - Edited",
      },
    ]);
  }

  describe("Editblog", () => {
    beforeEach(() => {
      setupMockServer();
      cy.login("andre@gmail.com", "andre123")
    });
  
    it("should succesfully edit a blog to the homepage", () => {
      cy.visit("/editBlog/23");
      cy.url().should("include", "/editBlog/23");
      cy.get("#title-cy").type("Title About food - Edited");
      cy.get("#title-cy").should("have.value", "Title About food - Edited");
      cy.get("#description-cy").clear();
      cy.get("#description-cy").type("Some description about food, very intersting - Edited")
      cy.get("#description-cy").should("have.value", "Some description about food, very intersting - Edited");
      cy.get('input[type=file]').selectFile('src/Images/molho-de-francesinha-picante.jpg')
      cy.wait(5000)
      cy.get("#selection-cy").select('Sights')
      cy.get("button[type=submit]").click({force: true});
    });
  });