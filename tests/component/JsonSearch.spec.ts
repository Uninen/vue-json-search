import { mount } from '@cypress/vue'
import JsonSearch from '../../src/components/JsonSearch.vue'

it('Passes msg prop correctly', () => {
  mount(JsonSearch)
  cy.get('input').should('exist')
})
