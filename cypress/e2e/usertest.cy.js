// ============================================================
//  Financial Foundations — User Workflow Tests
//  Simulates realistic journeys a user would take through
//  the site, rather than testing individual elements in
//  isolation.
//
//  Selectors use data-cy attributes throughout for stability.
//  These are independent of CSS class names, layout changes,
//  or DOM restructuring.
// ============================================================


// ── WORKFLOW 1: New user lands on homepage and explores ───────

describe('Workflow 1 — New user arrives and starts Module 1', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('lands on the homepage and sees the welcome content', () => {
    cy.title().should('eq', 'Financial Foundations: Educational Resource')
    cy.get('[data-cy="hero"]').should('be.visible')
    cy.get('[data-cy="hero-heading"]').should('contain.text', 'Financial')
    cy.get('[data-cy="hero-subtitle"]').should('be.visible')
  })

  it('sees the "Explore Modules" button and clicks it', () => {
    cy.get('[data-cy="explore-cta"]').should('be.visible').and('contain.text', 'Explore Modules').click()
    cy.get('[data-cy="modules-section"]').should('exist')
  })

  it('sees all 7 module cards after scrolling to modules', () => {
    cy.get('[data-cy="module-card"]').should('have.length', 7)
    cy.get('[data-cy="card-title"]').first().should('contain.text', 'Financial Markets')
  })

  it('clicks Module 1 and arrives on the correct section page', () => {
    cy.get('[data-cy="module-card"]').eq(0).click()
    cy.url().should('include', 'section-1.html')
    cy.get('[data-cy="section-content"] h2').should('contain.text', 'Financial Markets')
  })

  it('clicks Module 1 and sees the video and written content', () => {
    cy.get('[data-cy="module-card"]').eq(0).click()
    cy.get('[data-cy="video-wrapper"]').should('have.length.greaterThan', 0)
    cy.get('[data-cy="text-content"]').should('be.visible')
    cy.get('[data-cy="text-content"] h3').should('have.length.greaterThan', 0)
  })

})


// ── WORKFLOW 2: User reads Module 1 then continues to Module 2

describe('Workflow 2 — User works through Module 1 then advances to Module 2', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('clicks into Module 1 and confirms content is present', () => {
    cy.get('[data-cy="module-card"]').eq(0).click()
    cy.get('[data-cy="section-content"] h2').should('contain.text', 'Section 1')
    cy.get('[data-cy="text-content"]').should('be.visible')
  })

  it('clicks into Module 1 then clicks Next to move to Module 2', () => {
    cy.get('[data-cy="module-card"]').eq(0).click()
    cy.get('[data-cy="next-button"]').not('.off').click()
    cy.url().should('include', 'section-2.html')
  })

  it('clicks into Module 1, advances to Module 2, and checks heading', () => {
    cy.get('[data-cy="module-card"]').eq(0).click()
    cy.get('[data-cy="next-button"]').not('.off').click()
    cy.get('[data-cy="section-content"] h2').should('contain.text', 'Section 2')
    cy.get('[data-cy="section-content"] h2').should('contain.text', 'Equity Trading')
  })

  it('clicks into Module 1, advances to Module 2, and checks content', () => {
    cy.get('[data-cy="module-card"]').eq(0).click()
    cy.get('[data-cy="next-button"]').not('.off').click()
    cy.get('[data-cy="video-container"] iframe').should('have.length.greaterThan', 0)
    cy.get('[data-cy="text-content"]').should('be.visible')
  })

  it('clicks into Module 2 and goes back to Module 1 using Prev', () => {
    cy.get('[data-cy="module-card"]').eq(1).click()
    cy.get('[data-cy="prev-button"]').not('.off').click()
    cy.url().should('include', 'section-1.html')
  })

})


// ── WORKFLOW 3: User completes all 7 modules in sequence ──────

describe('Workflow 3 — User clicks through all 7 modules in order', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('navigates from homepage → section 1 → 2 → 3 → 4 → 5 → 6 → 7 using Next', () => {
    cy.get('[data-cy="module-card"]').eq(0).click()
    cy.get('[data-cy="section-content"] h2').should('contain.text', 'Section 1')

    cy.get('[data-cy="next-button"]').not('.off').click()
    cy.url().should('include', 'section-2.html')
    cy.get('[data-cy="section-content"] h2').should('contain.text', 'Section 2')

    cy.get('[data-cy="next-button"]').not('.off').click()
    cy.url().should('include', 'section-3.html')
    cy.get('[data-cy="section-content"] h2').should('contain.text', 'Section 3')

    cy.get('[data-cy="next-button"]').not('.off').click()
    cy.url().should('include', 'section-4.html')
    cy.get('[data-cy="section-content"] h2').should('contain.text', 'Section 4')

    cy.get('[data-cy="next-button"]').not('.off').click()
    cy.url().should('include', 'section-5.html')
    cy.get('[data-cy="section-content"] h2').should('contain.text', 'Section 5')

    cy.get('[data-cy="next-button"]').not('.off').click()
    cy.url().should('include', 'section-6.html')
    cy.get('[data-cy="section-content"] h2').should('contain.text', 'Section 6')

    cy.get('[data-cy="next-button"]').not('.off').click()
    cy.url().should('include', 'section-7.html')
    cy.get('[data-cy="section-content"] h2').should('contain.text', 'Section 7')
  })

  it('clicks into Module 7 directly and confirms the Next button is disabled', () => {
    cy.get('[data-cy="module-card"]').eq(6).click()
    cy.get('[data-cy="next-button"]').should('have.class', 'off')
  })

})


// ── WORKFLOW 4: User jumps directly to a specific module ──────

describe('Workflow 4 — Returning user jumps straight to Derivatives', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('clicks directly on Module 4 from the homepage', () => {
    cy.get('[data-cy="module-card"]').eq(3).should('contain.text', 'Derivatives').click()
    cy.url().should('include', 'section-4.html')
  })

  it('clicks Module 4 and checks the title and content', () => {
    cy.get('[data-cy="module-card"]').eq(3).click()
    cy.get('[data-cy="section-content"] h2').should('contain.text', 'Derivatives')
    cy.get('[data-cy="text-content"]').invoke('text').then((text) => {
      expect(text.toLowerCase()).to.match(/future|option|swap/)
    })
  })

  it('clicks Module 4 then returns to the homepage via All Modules', () => {
    cy.get('[data-cy="module-card"]').eq(3).click()
    cy.get('[data-cy="all-modules-link"]').click()
    cy.url().should('include', 'index.html')
    cy.get('[data-cy="hero"]').should('be.visible')
  })

})


// ── WORKFLOW 5: User browses homepage then goes back and forth──

describe('Workflow 5 — User browses multiple modules via homepage', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('picks Module 3, returns to homepage, then picks Module 6', () => {
    cy.get('[data-cy="module-card"]').eq(2).click()
    cy.url().should('include', 'section-3.html')
    cy.get('[data-cy="section-content"] h2').should('contain.text', 'Fixed Income')

    cy.get('[data-cy="all-modules-link"]').click()
    cy.url().should('include', 'index.html')
    cy.get('[data-cy="module-card"]').should('have.length', 7)

    cy.get('[data-cy="module-card"]').eq(5).click()
    cy.url().should('include', 'section-6.html')
    cy.get('[data-cy="section-content"] h2').should('contain.text', 'Treasury')
  })

  it('picks Module 6 and navigates back to Module 5 using Prev', () => {
    cy.get('[data-cy="module-card"]').eq(5).click()
    cy.get('[data-cy="prev-button"]').not('.off').click()
    cy.url().should('include', 'section-5.html')
    cy.get('[data-cy="section-content"] h2').should('contain.text', 'Currency')
  })

})


// ── WORKFLOW 6: User reads Module 7 (the final module) ────────

describe('Workflow 6 — User completes the final module', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('clicks Module 7 from the homepage', () => {
    cy.get('[data-cy="module-card"]').eq(6).click()
    cy.url().should('include', 'section-7.html')
  })

  it('clicks Module 7 and checks it contains regulation and risk content', () => {
    cy.get('[data-cy="module-card"]').eq(6).click()
    cy.get('[data-cy="text-content"]').invoke('text').then((text) => {
      expect(text.toLowerCase()).to.match(/regulat|risk|basel|compliance/)
    })
  })

  it('clicks Module 7 and confirms there is no Next button', () => {
    cy.get('[data-cy="module-card"]').eq(6).click()
    cy.get('[data-cy="next-button"]').should('have.class', 'off')
  })

  it('clicks Module 7 then returns to the homepage after finishing', () => {
    cy.get('[data-cy="module-card"]').eq(6).click()
    cy.get('[data-cy="all-modules-link"]').click()
    cy.url().should('include', 'index.html')
    cy.get('[data-cy="hero-heading"]').should('be.visible')
  })

})