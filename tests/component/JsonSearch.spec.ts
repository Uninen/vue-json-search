import { mount } from '@cypress/vue'
import JsonSearch from '../../src/components/JsonSearch.vue'

describe('JsonSearch', () => {
  it('Searches correctly', () => {
    mount(JsonSearch)

    cy.get('input').should('exist')

    // Test basic search
    cy.get('input').type('dja')
    cy.get('.result').should('have.length', 10)
    cy.get('.tag').should('have.length', 0)
    cy.get('h3').should('have.text', '11 results')
  })

  it('Displays results correctly', () => {
    mount(JsonSearch)

    // Test 0 results
    cy.get('input').type('hgjfdgklhdfjglkhdsgjlfdshgjdsflhgjdfslghdfsghdfsjklh')
    cy.get('.result').should('have.length', 0)
    cy.get('.tag').should('have.length', 0)
    cy.get('h3').should('have.text', '0 results')

    // Test 1 result
    cy.get('input').clear().type('encrypted')
    cy.get('.result').should('have.length', 1)
    cy.get('.tag').should('have.length', 0)
    cy.get('h3').should('have.text', '1 result')

    // Test clearing results hides result text
    cy.get('input').type('encrypted').clear()
    cy.get('.result').should('have.length', 0)
    cy.get('.tag').should('have.length', 0)
    cy.get('h3').should('not.exist')
  })

  it('Passes props correctly', () => {
    mount(JsonSearch, {
      props: {
        url: '/copy.json',
        maxResults: 5,
        showTags: true,
        tagRoot: '/foo/',
      },
    })

    cy.get('input').should('exist')
    cy.get('input').type('dja')
    cy.get('.result').should('have.length', 5)
    cy.get('.tag').should('have.length', 25)
    cy.get('h3').should('have.text', '11 results')

    cy.get('.tag').first().should('have.attr', 'href').and('contain', '/foo/')
  })

  it('Displays console error when failing to fetch data', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'error')

      mount(JsonSearch, {
        props: {
          url: '/doesntexist.json',
        },
      })

      cy.wait(100).then(() => {
        cy.get('input').should('not.exist')
        expect(win.console.error).to.have.callCount(1)
      })
    })
  })
})
