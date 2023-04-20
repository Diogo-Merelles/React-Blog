function setupMockServer() {
  cy.setupMockServer("POST", "http://localhost:5000/user", "getUser", 200, [
    {
      title: "Title About food",
      description: "Some description about food, very intersting",
    },
  ]);
}

describe("Addblog", () => {
  beforeEach(() => {
    setupMockServer();
    cy.login("andre@gmail.com", "andre123")
  });

  it("should succesfully create and add a new blog to the homepage", () => {
    cy.visit("/addBlog");
    cy.url().should("include", "/addBlog");
    cy.get("#title-cy").type("Title About food");
    cy.get("#title-cy").should("have.value", "Title About food");
    cy.get("#description-cy").type("Some description about food, very intersting");
    cy.get("#description-cy").should("have.value", "Some description about food, very intersting");
    cy.get('input[type=file]').selectFile('src/Images/clerigos.jpeg')
    cy.wait(5000)
    cy.get("#selection-cy").select('Food')
    cy.get("button[type=submit]").click({force: true});
  });
});
