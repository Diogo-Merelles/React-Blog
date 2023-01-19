function setupMockServer() {
    cy.setupMockServer("GET", "http://localhost:5000/blogs", "getBlogs", 200, [
      {
        title: "dfgdfgdfgdfgdf",
        description:
          "gdfgdfgdfgdfgfdgfdgfdfgdfgdfgsfgsdgfsdfgdfgdfgdfgdfgdfgdfgdf",
        category: "Wine House",
        imageUrl:
          "http://res.cloudinary.com/dxaepqu6q/image/upload/v1673014153/rv0ze9abgapxpwaiixgt.png",
        date: "06/01/2023",
        id: 11,
        authorId: 1,
      },
    ]);
  }

describe("Blog", () => {

    beforeEach(() => {
        setupMockServer();
        cy.login()
      })

    it("should create a new blog post", () => {
      cy.visit("/addblog");
      cy.url().should("include", "/addblog");
      cy.get(".title-input").type("Some Title");
      cy.get(".title-input").should("have.value", "Some Title");
      cy.get(".description-input").type("Some Description");
      cy.get(".description-input").should("have.value", "Some Description");
    });
  });