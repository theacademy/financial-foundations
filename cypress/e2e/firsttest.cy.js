describe('My Website', () => {
  it('loads the homepage', () => {
    cy.visit('http://mthree-peregrine-s3-2.s3-website-us-east-1.amazonaws.com/')
    cy.visit('/')
    cy.title().should('not.be.empty')
  })

  it('checks a heading exists', () => {
    cy.visit('/')
    cy.get('h1').should('be.visible')
  })

  it('checks a link navigates correctly', () => {
    cy.visit('http://mthree-peregrine-s3-2.s3-website-us-east-1.amazonaws.com/')
    cy.visit('/')
    cy.get('a[href="section-1.html"]').click()
    cy.url().should('include', 'section-1.html')
  })
})