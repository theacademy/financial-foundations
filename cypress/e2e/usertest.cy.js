// ============================================================
//  Financial Foundations — User Workflow Tests
//  Simulates realistic journeys a user would take through
//  the site, rather than testing individual elements in
//  isolation.
// ============================================================


// ── WORKFLOW 1: New user lands on homepage and explores ───────
//
//  A first-time visitor arrives at the homepage, reads the
//  hero section, scrolls down to see the modules, and clicks
//  into the first one to start learning.

describe('Workflow 1 — New user arrives and starts Module 1', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('lands on the homepage and sees the welcome content', () => {
    cy.title().should('eq', 'Financial Foundations: Educational Resource')
    cy.get('.hero').should('be.visible')
    cy.get('.hero h1').should('contain.text', 'Financial')
    cy.get('.hero-sub').should('be.visible')
  })

  it('sees the "Explore Modules" button and clicks it', () => {
    cy.get('a.hero-cta').should('be.visible').and('contain.text', 'Explore Modules').click()
    cy.get('#modules').should('exist')
  })

  it('sees all 7 module cards after scrolling to modules', () => {
    cy.get('.cards-grid .card').should('have.length', 7)
    cy.get('.card-title').first().should('contain.text', 'Financial Markets')
  })

  it('clicks Module 1 and arrives on the correct section page', () => {
    cy.get('.cards-grid .card').eq(0).click()
    cy.url().should('include', 'section-1.html')
    cy.get('h2').should('contain.text', 'Financial Markets')
  })

  it('clicks Module 1 and sees the video and written content', () => {
    cy.get('.cards-grid .card').eq(0).click()
    cy.get('.video-wrapper').should('have.length.greaterThan', 0)
    cy.get('.text-content').should('be.visible')
    cy.get('.text-content h3').should('have.length.greaterThan', 0)
  })

})


// ── WORKFLOW 2: User reads Module 1 then continues to Module 2
//
//  All tests start from the homepage. Tests that need to be
//  on a section page navigate there by clicking the card,
//  keeping the journey realistic.

describe('Workflow 2 — User works through Module 1 then advances to Module 2', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('clicks into Module 1 and confirms content is present', () => {
    cy.get('.cards-grid .card').eq(0).click()
    cy.get('h2').should('contain.text', 'Section 1')
    cy.get('.text-content').should('be.visible')
  })

  it('clicks into Module 1 then clicks Next to move to Module 2', () => {
    cy.get('.cards-grid .card').eq(0).click()
    cy.get('.ff-arrows a').not('.off').contains('Next').click()
    cy.url().should('include', 'section-2.html')
  })

  it('clicks into Module 1, advances to Module 2, and checks heading', () => {
    cy.get('.cards-grid .card').eq(0).click()
    cy.get('.ff-arrows a').not('.off').contains('Next').click()
    cy.get('h2').should('contain.text', 'Section 2')
    cy.get('h2').should('contain.text', 'Equity Trading')
  })

  it('clicks into Module 1, advances to Module 2, and checks content', () => {
    cy.get('.cards-grid .card').eq(0).click()
    cy.get('.ff-arrows a').not('.off').contains('Next').click()
    cy.get('iframe').should('have.length.greaterThan', 0)
    cy.get('.text-content').should('be.visible')
  })

  it('clicks into Module 2 and goes back to Module 1 using Prev', () => {
    cy.get('.cards-grid .card').eq(1).click()
    cy.get('.ff-arrows a').not('.off').contains('Prev').click()
    cy.url().should('include', 'section-1.html')
  })

})


// ── WORKFLOW 3: User completes all 7 modules in sequence ──────
//
//  A motivated user starts at Module 1 and clicks Next
//  through every module all the way to the end.
//  beforeEach starts at the homepage; the single journey
//  test then navigates from there.

describe('Workflow 3 — User clicks through all 7 modules in order', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('navigates from homepage → section 1 → 2 → 3 → 4 → 5 → 6 → 7 using Next', () => {
    cy.get('.cards-grid .card').eq(0).click()
    cy.get('h2').should('contain.text', 'Section 1')

    cy.get('.ff-arrows a').not('.off').contains('Next').click()
    cy.url().should('include', 'section-2.html')
    cy.get('h2').should('contain.text', 'Section 2')

    cy.get('.ff-arrows a').not('.off').contains('Next').click()
    cy.url().should('include', 'section-3.html')
    cy.get('h2').should('contain.text', 'Section 3')

    cy.get('.ff-arrows a').not('.off').contains('Next').click()
    cy.url().should('include', 'section-4.html')
    cy.get('h2').should('contain.text', 'Section 4')

    cy.get('.ff-arrows a').not('.off').contains('Next').click()
    cy.url().should('include', 'section-5.html')
    cy.get('h2').should('contain.text', 'Section 5')

    cy.get('.ff-arrows a').not('.off').contains('Next').click()
    cy.url().should('include', 'section-6.html')
    cy.get('h2').should('contain.text', 'Section 6')

    cy.get('.ff-arrows a').not('.off').contains('Next').click()
    cy.url().should('include', 'section-7.html')
    cy.get('h2').should('contain.text', 'Section 7')
  })

  it('clicks into Module 7 directly and confirms the Next button is disabled', () => {
    cy.get('.cards-grid .card').eq(6).click()
    cy.get('.ff-arrows a.off').should('contain.text', 'Next')
  })

})


// ── WORKFLOW 4: User jumps directly to a specific module ──────
//
//  A returning user who already knows some finance skips
//  straight to Derivatives (section 4) from the homepage.

describe('Workflow 4 — Returning user jumps straight to Derivatives', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('clicks directly on Module 4 from the homepage', () => {
    cy.get('.cards-grid .card').eq(3).should('contain.text', 'Derivatives').click()
    cy.url().should('include', 'section-4.html')
  })

  it('clicks Module 4 and checks the title and content', () => {
    cy.get('.cards-grid .card').eq(3).click()
    cy.get('h2').should('contain.text', 'Derivatives')
    cy.get('.text-content').invoke('text').then((text) => {
      expect(text.toLowerCase()).to.match(/future|option|swap/)
    })
  })

  it('clicks Module 4 then returns to the homepage via All Modules', () => {
    cy.get('.cards-grid .card').eq(3).click()
    cy.get('.ff-home').click()
    cy.url().should('include', 'index.html')
    cy.get('.hero').should('be.visible')
  })

})


// ── WORKFLOW 5: User browses homepage then goes back and forth──
//
//  A user picks a module, reads it, goes back to the homepage,
//  picks a different module, and reads that too.
//  Every test begins fresh from the homepage via beforeEach.

describe('Workflow 5 — User browses multiple modules via homepage', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('picks Module 3, returns to homepage, then picks Module 6', () => {
    cy.get('.cards-grid .card').eq(2).click()
    cy.url().should('include', 'section-3.html')
    cy.get('h2').should('contain.text', 'Fixed Income')

    cy.get('.ff-home').click()
    cy.url().should('include', 'index.html')
    cy.get('.cards-grid .card').should('have.length', 7)

    cy.get('.cards-grid .card').eq(5).click()
    cy.url().should('include', 'section-6.html')
    cy.get('h2').should('contain.text', 'Treasury')
  })

  it('picks Module 6 and navigates back to Module 5 using Prev', () => {
    cy.get('.cards-grid .card').eq(5).click()
    cy.get('.ff-arrows a').not('.off').contains('Prev').click()
    cy.url().should('include', 'section-5.html')
    cy.get('h2').should('contain.text', 'Currency')
  })

})


// ── WORKFLOW 6: User reads Module 7 (the final module) ────────
//
//  A user navigates to the last module, checks the content
//  is about regulation and risk, and confirms there is no
//  Next button to click (they've finished the course).

describe('Workflow 6 — User completes the final module', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('clicks Module 7 from the homepage', () => {
    cy.get('.cards-grid .card').eq(6).click()
    cy.url().should('include', 'section-7.html')
  })

  it('clicks Module 7 and checks it contains regulation and risk content', () => {
    cy.get('.cards-grid .card').eq(6).click()
    cy.get('.text-content').invoke('text').then((text) => {
      expect(text.toLowerCase()).to.match(/regulat|risk|basel|compliance/)
    })
  })

  it('clicks Module 7 and confirms there is no Next button', () => {
    cy.get('.cards-grid .card').eq(6).click()
    cy.get('.ff-arrows a.off').should('contain.text', 'Next')
  })

  it('clicks Module 7 then returns to the homepage after finishing', () => {
    cy.get('.cards-grid .card').eq(6).click()
    cy.get('.ff-home').click()
    cy.url().should('include', 'index.html')
    cy.get('.hero h1').should('be.visible')
  })

})