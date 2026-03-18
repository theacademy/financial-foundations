// ============================================================
//  Financial Foundations — Full Test Suite
//  Covers: Homepage, Navigation, Section Content,
//          Videos, UI Consistency, and Accessibility
//
//  Selectors use data-cy attributes throughout for stability.
//  These are independent of CSS class names, layout changes,
//  or DOM restructuring.
// ============================================================


// ── HOMEPAGE ─────────────────────────────────────────────────

describe('Homepage', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  // Page load
  it('loads successfully and has the correct title', () => {
    cy.title().should('eq', 'Financial Foundations: Educational Resource')
  })

  it('displays the hero section', () => {
    cy.get('[data-cy="hero"]').should('be.visible')
  })

  it('displays the main heading "Financial Foundations"', () => {
    cy.get('[data-cy="hero-heading"]').should('be.visible').and('contain.text', 'Financial')
    cy.get('[data-cy="hero-heading"] em').should('contain.text', 'Foundations')
  })

  it('displays the eyebrow label', () => {
    cy.get('[data-cy="eyebrow"]').should('contain.text', 'mthree')
  })

  it('displays the hero subtitle', () => {
    cy.get('[data-cy="hero-subtitle"]').should('be.visible').and('not.be.empty')
  })

  // CTA button
  it('displays the "Explore Modules" CTA button', () => {
    cy.get('[data-cy="explore-cta"]').should('be.visible').and('contain.text', 'Explore Modules')
  })

  it('"Explore Modules" CTA links to the #modules section', () => {
    cy.get('[data-cy="explore-cta"]').should('have.attr', 'href', '#modules')
  })

  // Module cards
  it('displays the modules section', () => {
    cy.get('[data-cy="modules-section"]').should('exist')
    cy.get('[data-cy="section-label"]').should('contain.text', 'Seven Modules')
  })

  it('renders exactly 7 module cards', () => {
    cy.get('[data-cy="module-card"]').should('have.length', 7)
  })

  it('all 7 cards are visible', () => {
    cy.get('[data-cy="module-card"]').each(($card) => {
      cy.wrap($card).should('be.visible')
    })
  })

  it('each card has a title', () => {
    cy.get('[data-cy="card-title"]').each(($title) => {
      cy.wrap($title).should('not.be.empty')
    })
  })

  it('each card has a description', () => {
    cy.get('[data-cy="card-desc"]').each(($desc) => {
      cy.wrap($desc).should('not.be.empty')
    })
  })

  it('each card has a "Begin module" link', () => {
    cy.get('[data-cy="card-link"]').each(($link) => {
      cy.wrap($link).should('contain.text', 'Begin module')
    })
  })

  it('cards have the correct module numbers 01–07', () => {
    const expectedNums = ['01', '02', '03', '04', '05', '06', '07']
    cy.get('[data-cy="card-number"]').each(($num, index) => {
      cy.wrap($num).should('contain.text', expectedNums[index])
    })
  })

  it('cards have the correct module titles', () => {
    const expectedTitles = [
      'Financial Markets',
      'Equity Trading',
      'Fixed Income',
      'Derivatives',
      'Currency & Foreign Exchange',
      'Treasury',
      'Regulation & Risk',
    ]
    cy.get('[data-cy="card-title"]').each(($title, index) => {
      cy.wrap($title).should('contain.text', expectedTitles[index])
    })
  })

  // Card href links
  it('card 1 links to section-1.html', () => {
    cy.get('[data-cy="module-card"]').eq(0).should('have.attr', 'href', 'section-1.html')
  })

  it('card 2 links to section-2.html', () => {
    cy.get('[data-cy="module-card"]').eq(1).should('have.attr', 'href', 'section-2.html')
  })

  it('card 3 links to section-3.html', () => {
    cy.get('[data-cy="module-card"]').eq(2).should('have.attr', 'href', 'section-3.html')
  })

  it('card 4 links to section-4.html', () => {
    cy.get('[data-cy="module-card"]').eq(3).should('have.attr', 'href', 'section-4.html')
  })

  it('card 5 links to section-5.html', () => {
    cy.get('[data-cy="module-card"]').eq(4).should('have.attr', 'href', 'section-5.html')
  })

  it('card 6 links to section-6.html', () => {
    cy.get('[data-cy="module-card"]').eq(5).should('have.attr', 'href', 'section-6.html')
  })

  it('card 7 links to section-7.html', () => {
    cy.get('[data-cy="module-card"]').eq(6).should('have.attr', 'href', 'section-7.html')
  })

  // Footer
  it('displays the footer', () => {
    cy.get('[data-cy="footer"]').should('be.visible')
  })

  it('footer contains the copyright notice', () => {
    cy.get('[data-cy="footer"]').should('contain.text', 'Financial Foundations')
  })

})


// ── NAVIGATION — Homepage to Sections ────────────────────────

describe('Navigation — Homepage to Sections', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('clicking card 1 navigates to section-1.html', () => {
    cy.get('[data-cy="module-card"]').eq(0).click()
    cy.url().should('include', 'section-1.html')
  })

  it('clicking card 2 navigates to section-2.html', () => {
    cy.get('[data-cy="module-card"]').eq(1).click()
    cy.url().should('include', 'section-2.html')
  })

  it('clicking card 3 navigates to section-3.html', () => {
    cy.get('[data-cy="module-card"]').eq(2).click()
    cy.url().should('include', 'section-3.html')
  })

  it('clicking card 4 navigates to section-4.html', () => {
    cy.get('[data-cy="module-card"]').eq(3).click()
    cy.url().should('include', 'section-4.html')
  })

  it('clicking card 5 navigates to section-5.html', () => {
    cy.get('[data-cy="module-card"]').eq(4).click()
    cy.url().should('include', 'section-5.html')
  })

  it('clicking card 6 navigates to section-6.html', () => {
    cy.get('[data-cy="module-card"]').eq(5).click()
    cy.url().should('include', 'section-6.html')
  })

  it('clicking card 7 navigates to section-7.html', () => {
    cy.get('[data-cy="module-card"]').eq(6).click()
    cy.url().should('include', 'section-7.html')
  })

})


// ── NAVIGATION — Topbar "All Modules" back link ───────────────

describe('Navigation — Topbar "All Modules" back link', () => {

  it('returns to homepage from section 1', () => {
    cy.visit('/section-1.html')
    cy.get('[data-cy="all-modules-link"]').click()
    cy.url().should('include', 'index.html')
  })

  it('returns to homepage from section 4', () => {
    cy.visit('/section-4.html')
    cy.get('[data-cy="all-modules-link"]').click()
    cy.url().should('include', 'index.html')
  })

  it('returns to homepage from section 7', () => {
    cy.visit('/section-7.html')
    cy.get('[data-cy="all-modules-link"]').click()
    cy.url().should('include', 'index.html')
  })

})


// ── NAVIGATION — NEXT arrow ───────────────────────────────────

describe('Navigation — NEXT arrow between sections', () => {

  it('NEXT on section 1 goes to section 2', () => {
    cy.visit('/section-1.html')
    cy.get('[data-cy="next-button"]').not('.off').click()
    cy.url().should('include', 'section-2.html')
  })

  it('NEXT on section 2 goes to section 3', () => {
    cy.visit('/section-2.html')
    cy.get('[data-cy="next-button"]').not('.off').click()
    cy.url().should('include', 'section-3.html')
  })

  it('NEXT on section 3 goes to section 4', () => {
    cy.visit('/section-3.html')
    cy.get('[data-cy="next-button"]').not('.off').click()
    cy.url().should('include', 'section-4.html')
  })

  it('NEXT on section 4 goes to section 5', () => {
    cy.visit('/section-4.html')
    cy.get('[data-cy="next-button"]').not('.off').click()
    cy.url().should('include', 'section-5.html')
  })

  it('NEXT on section 5 goes to section 6', () => {
    cy.visit('/section-5.html')
    cy.get('[data-cy="next-button"]').not('.off').click()
    cy.url().should('include', 'section-6.html')
  })

  it('NEXT on section 6 goes to section 7', () => {
    cy.visit('/section-6.html')
    cy.get('[data-cy="next-button"]').not('.off').click()
    cy.url().should('include', 'section-7.html')
  })

})


// ── NAVIGATION — PREV arrow ───────────────────────────────────

describe('Navigation — PREV arrow between sections', () => {

  it('PREV on section 2 goes back to section 1', () => {
    cy.visit('/section-2.html')
    cy.get('[data-cy="prev-button"]').not('.off').click()
    cy.url().should('include', 'section-1.html')
  })

  it('PREV on section 7 goes back to section 6', () => {
    cy.visit('/section-7.html')
    cy.get('[data-cy="prev-button"]').not('.off').click()
    cy.url().should('include', 'section-6.html')
  })

})


// ── NAVIGATION — Boundary conditions ─────────────────────────

describe('Navigation — Boundary conditions', () => {

  it('section 1 PREV button is disabled', () => {
    cy.visit('/section-1.html')
    cy.get('[data-cy="prev-button"]').should('have.class', 'off')
  })

  it('section 7 NEXT button is disabled', () => {
    cy.visit('/section-7.html')
    cy.get('[data-cy="next-button"]').should('have.class', 'off')
  })

})


// ── SECTION CONTENT — Shared checks ──────────────────────────

const sharedSectionChecks = (sectionNumber, expectedTitle) => {

  it('page title contains the module name', () => {
    cy.title().should('include', expectedTitle)
  })

  it('topbar is visible', () => {
    cy.get('[data-cy="topbar"]').should('be.visible')
  })

  it('"All Modules" link is visible in topbar', () => {
    cy.get('[data-cy="all-modules-link"]').should('be.visible').and('contain.text', 'All Modules')
  })

  it('section heading is visible and correct', () => {
    cy.get('[data-cy="section-content"] h2').should('be.visible').and('contain.text', `Section ${sectionNumber}`)
    cy.get('[data-cy="section-content"] h2').should('contain.text', expectedTitle)
  })

  it('section number badge is correct', () => {
    cy.get('[data-cy="section-number"]').should('contain.text', String(sectionNumber))
  })

  it('at least one video iframe is present', () => {
    cy.get('[data-cy="video-container"] iframe').should('have.length.greaterThan', 0)
  })

  it('written content area is present', () => {
    cy.get('[data-cy="text-content"]').should('exist')
  })

  it('written content has at least one heading', () => {
    cy.get('[data-cy="text-content"] h3').should('have.length.greaterThan', 0)
  })

  it('written content has visible paragraphs', () => {
    cy.get('[data-cy="text-content"] p').should('have.length.greaterThan', 0)
  })

  it('navigation arrows are present', () => {
    cy.get('[data-cy="nav-arrows"]').should('exist')
  })

}

describe('Section 1 — Financial Markets', () => {
  beforeEach(() => { cy.visit('/section-1.html') })
  sharedSectionChecks(1, 'Financial Markets')
  it('contains content about types of banks', () => {
    cy.get('[data-cy="text-content"]').should('contain.text', 'bank')
  })
})

describe('Section 2 — Equity Trading', () => {
  beforeEach(() => { cy.visit('/section-2.html') })
  sharedSectionChecks(2, 'Equity Trading')
  it('contains content about equity or IPO', () => {
    cy.get('[data-cy="text-content"]').invoke('text').then((text) => {
      expect(text.toLowerCase()).to.match(/equity|ipo|share/)
    })
  })
})

describe('Section 3 — Fixed Income', () => {
  beforeEach(() => { cy.visit('/section-3.html') })
  sharedSectionChecks(3, 'Fixed Income')
  it('contains content about bonds', () => {
    cy.get('[data-cy="text-content"]').invoke('text').then((text) => {
      expect(text.toLowerCase()).to.include('bond')
    })
  })
})

describe('Section 4 — Derivatives', () => {
  beforeEach(() => { cy.visit('/section-4.html') })
  sharedSectionChecks(4, 'Derivatives')
  it('contains content about futures or options', () => {
    cy.get('[data-cy="text-content"]').invoke('text').then((text) => {
      expect(text.toLowerCase()).to.match(/future|option|swap/)
    })
  })
})

describe('Section 5 — Currency & Foreign Exchange', () => {
  beforeEach(() => { cy.visit('/section-5.html') })
  sharedSectionChecks(5, 'Currency')
  it('contains content about FX or currency', () => {
    cy.get('[data-cy="text-content"]').invoke('text').then((text) => {
      expect(text.toLowerCase()).to.match(/currency|foreign exchange|fx/)
    })
  })
})

describe('Section 6 — Treasury', () => {
  beforeEach(() => { cy.visit('/section-6.html') })
  sharedSectionChecks(6, 'Treasury')
  it('contains content about liquidity or capital', () => {
    cy.get('[data-cy="text-content"]').invoke('text').then((text) => {
      expect(text.toLowerCase()).to.match(/treasury|liquidity|capital/)
    })
  })
})

describe('Section 7 — Regulation & Risk', () => {
  beforeEach(() => { cy.visit('/section-7.html') })
  sharedSectionChecks(7, 'Regulation')
  it('contains content about regulation or risk', () => {
    cy.get('[data-cy="text-content"]').invoke('text').then((text) => {
      expect(text.toLowerCase()).to.match(/regulat|risk|basel/)
    })
  })
})


// ── VIDEO ELEMENTS ────────────────────────────────────────────

describe('Video Elements', () => {

  it('section 1 has a video label containing "Financial Markets"', () => {
    cy.visit('/section-1.html')
    cy.get('[data-cy="video-label"]').first().should('contain.text', 'Financial Markets')
  })

  it('section 1 has multiple video wrappers', () => {
    cy.visit('/section-1.html')
    cy.get('[data-cy="video-wrapper"]').should('have.length.greaterThan', 1)
  })

  it('all video iframes on section 1 have a src attribute', () => {
    cy.visit('/section-1.html')
    cy.get('[data-cy="video-container"] iframe').each(($iframe) => {
      cy.wrap($iframe).should('have.attr', 'src').and('not.be.empty')
    })
  })

  it('all video iframes on section 2 have a src attribute', () => {
    cy.visit('/section-2.html')
    cy.get('[data-cy="video-container"] iframe').each(($iframe) => {
      cy.wrap($iframe).should('have.attr', 'src').and('not.be.empty')
    })
  })

  it('all video iframes have a title attribute for accessibility', () => {
    cy.visit('/section-1.html')
    cy.get('[data-cy="video-container"] iframe').each(($iframe) => {
      cy.wrap($iframe).should('have.attr', 'title').and('not.be.empty')
    })
  })

  it('video containers are present on every section page', () => {
    const sections = [
      '/section-1.html', '/section-2.html', '/section-3.html',
      '/section-4.html', '/section-5.html', '/section-6.html',
      '/section-7.html',
    ]
    sections.forEach((path) => {
      cy.visit(path)
      cy.get('[data-cy="video-container"]').should('have.length.greaterThan', 0)
    })
  })

})


// ── UI CONSISTENCY ────────────────────────────────────────────

describe('UI Consistency Across All Pages', () => {

  const allPages = [
    { path: '/',               label: 'Homepage'  },
    { path: '/section-1.html', label: 'Section 1' },
    { path: '/section-2.html', label: 'Section 2' },
    { path: '/section-3.html', label: 'Section 3' },
    { path: '/section-4.html', label: 'Section 4' },
    { path: '/section-5.html', label: 'Section 5' },
    { path: '/section-6.html', label: 'Section 6' },
    { path: '/section-7.html', label: 'Section 7' },
  ]

  allPages.forEach(({ path, label }) => {
    it(`${label} — page loads with a 200 status`, () => {
      cy.request(path).its('status').should('eq', 200)
    })
  })

  allPages.forEach(({ path, label }) => {
    it(`${label} — has a non-empty page title`, () => {
      cy.visit(path)
      cy.title().should('not.be.empty')
    })
  })

  allPages.forEach(({ path, label }) => {
    it(`${label} — contains "Financial" in the title`, () => {
      cy.visit(path)
      cy.title().should('include', 'Financial')
    })
  })

  it('all section pages have the sticky topbar navigation', () => {
    const sectionPages = [
      '/section-1.html', '/section-2.html', '/section-3.html',
      '/section-4.html', '/section-5.html', '/section-6.html',
      '/section-7.html',
    ]
    sectionPages.forEach((path) => {
      cy.visit(path)
      cy.get('[data-cy="topbar"]').should('be.visible')
    })
  })

})


// ── ACCESSIBILITY ─────────────────────────────────────────────

describe('Accessibility Basics', () => {

  it('homepage html element has a lang attribute', () => {
    cy.visit('/')
    cy.get('html').should('have.attr', 'lang', 'en')
  })

  it('section 1 html element has a lang attribute', () => {
    cy.visit('/section-1.html')
    cy.get('html').should('have.attr', 'lang', 'en')
  })

  it('homepage has exactly one h1', () => {
    cy.visit('/')
    cy.get('h1').should('have.length', 1)
  })

  it('section pages use h2 for the main section heading', () => {
    cy.visit('/section-1.html')
    cy.get('[data-cy="section-content"] h2').should('exist')
  })

  it('all images on the homepage have an alt attribute', () => {
    cy.visit('/')
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'alt')
    })
  })

})