describe('Load Page on Start', () => {
  it('Visits home page', () => {
    cy.visit('http://localhost:3000')
  })
})

describe('Login page', () => {
  it('finds the login page', () => {
    cy.visit('http://localhost:3000/login')
    cy.url().should('include', '/login')

  })
})

describe('Login', () => {
  it('logs in', () => {
    cy.visit('http://localhost:3000/login')
    cy.contains('type').click()
    cy.url().should('include', '/login')
    cy.get('.email-input').type('andre@gmail.com')
    cy.get('.email-input').should('have.value', 'andre@gmail.com')
    cy.get('.password-input').type('andre123')
    cy.get('.password-input').should('have.value', 'andre123')

  })
})

describe('create blog', () => {
  it('creates a new blog post', () => {
    cy.visit('http://localhost:3000/addblog')
    cy.contains('type').click()
    cy.url().should('include', '/addblog')
    cy.get('.title-input').type('Some Title')
    cy.get('.title-input').should('have.value', 'Some Title')
    cy.get('.description-input').type('Some Description')
    cy.get('.description-input').should('have.value', 'Some Description')
  })
})