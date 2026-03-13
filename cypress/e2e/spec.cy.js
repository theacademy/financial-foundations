describe('template spec', () => {
  it('passes', () => {
    cy.visit("https://charliew.net/books", {
      failOnStatusCode: false,
    })
    cy.get('a[href="/blog/"]').click();
    cy.get('a[href="/blog/ten-pointless-facts/"]').click();
    cy.get('a[href="/books/"]').click();
    cy.get('details[data-shelves="classics fiction read-in-2026"] span:nth-child(6)').click();
    cy.get('button[data-shelf="non-fiction"]').click();
    cy.get('div.shelf-filter').click();
    cy.get('div.shelf-filter').click();
    cy.get('button[data-shelf="low-fantasy"] span').click();
    cy.get('button[data-shelf="non-fiction"] span').click();
    cy.get('button.active span').click();
    cy.get('button[data-shelf="for-school"] span').click();
    cy.get('button[data-shelf="auto-biography"]').click();
    cy.get('#clear-filter').click();
    cy.get('details[data-shelves="owned discworld fiction high-fantasy read-in-2026"] span:nth-child(8)').click();
    cy.get('details[data-shelves="owned discworld fiction high-fantasy read-in-2026"] summary').click();
    cy.get('a[href="/"]').click();
  })
})