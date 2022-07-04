import { test, expect } from '@playwright/test'

test('Search', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('data-test-id=default')).toBeVisible()
  await expect(page.locator('data-test-id=searchinput')).toHaveCount(2)
  await page.locator('.jsonsearchinput').type('dja')
  await expect(page.locator('.result')).toHaveCount(5)
  await expect(page.locator('.tag')).toHaveCount(0)
  await expect(page.locator('data-test-id=searchresulttitle')).toHaveText('11 results')
})

test('Results display', async ({ page }) => {
  await page.goto('/')

  // Test 0 results
  await expect(page.locator('data-test-id=default')).toBeVisible()
  await page.fill('.jsonsearchinput', 'hgjfdgklhdfjglkhdsgjlfdshgjdsflhgjdfslghdfsghdfsjklh')
  await expect(page.locator('.result')).toHaveCount(0)
  await expect(page.locator('.tag')).toHaveCount(0)
  await expect(page.locator('data-test-id=searchresulttitle')).toHaveText('0 results')

  // Test 1 result
  await page.fill('.jsonsearchinput', 'encrypted')
  await expect(page.locator('.result')).toHaveCount(1)
  await expect(page.locator('data-test-id=searchresulttitle')).toHaveText('1 result')

  // Test clearing results hides result text
  await page.fill('.jsonsearchinput', '')
  await expect(page.locator('.result')).toHaveCount(0)
  await expect(page.locator('data-test-id=searchresulttitle')).toHaveCount(0)
})

test('Props', async ({ page }) => {
  await page.goto('/')

  // Test 0 results
  await expect(page.locator('data-test-id=default')).toBeVisible()
  await page.fill('.jsonsearchinput', 'hgjfdgklhdfjglkhdsgjlfdshgjdsflhgjdfslghdfsghdfsjklh')
  await expect(page.locator('.result')).toHaveCount(0)
  await expect(page.locator('.tag')).toHaveCount(0)
  await expect(page.locator('data-test-id=searchresulttitle')).toHaveText('0 results')

  // Test 1 result
  await page.fill('.jsonsearchinput', 'encrypted')
  await expect(page.locator('.result')).toHaveCount(1)
  await expect(page.locator('data-test-id=searchresulttitle')).toHaveText('1 result')

  // Test clearing results hides result text
  await page.fill('.jsonsearchinput', '')
  await expect(page.locator('.result')).toHaveCount(0)
  await expect(page.locator('data-test-id=searchresulttitle')).toHaveCount(0)
})

test('Errors', async ({ page }) => {
  const errorLogs: unknown[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errorLogs.push(message)
    }
  })

  await page.route('/index.json', (route) =>
    route.fulfill({
      status: 404,
      body: '',
    })
  )

  await page.goto('/')

  await expect(page.locator('.jsonsearchinput')).toHaveCount(0)
  expect(errorLogs.length === 4).toBeTruthy()
})

// FIXME: Convert this to Playwright component test after it gains slots support
//   it('Passes props correctly', () => {
//     mount(JsonSearch, {
//       props: {
//         url: '/copy.json',
//         maxResults: 5,
//         showTags: true,
//         tagRoot: '/foo/',
//       },
//     })

//     cy.get('input').should('exist')
//     cy.get('input').type('dja')
//     cy.get('.result').should('have.length', 5)
//     cy.get('.tag').should('have.length', 25)
//     cy.get('h3').should('have.text', '11 results')

//     cy.get('.tag').first().should('have.attr', 'href').and('contain', '/foo/')
//   })
