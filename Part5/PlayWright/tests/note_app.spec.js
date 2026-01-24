const { describe, test, expect, beforeEach } = require('@playwright/test')

describe('Note app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3002')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
    })

    test('user can log in', async ({ page }) => {
        await page.getByRole('button', { name: 'log in' }).click()
        await page.getByTestId('username').fill('testUser')
        await page.getByTestId('password').fill('0000')
        await page.getByRole('button', { name: 'Log in'}).click()

        await expect(page.getByText('username: testUSer, password: 0000 logged-in')).toBeVisible()
    })

    describe('when logged in', () => {
        test('a new note can be created', async ({ page }) => {
            //Log in
            await page.getByRole('button', { name: 'log in'}).click()
            await page.getByTestId('username').fill('testUser')
            await page.getByTestId('password').fill('0000')
            await page.getByRole('button', { name: 'Log in'}).click()

            //Create a new note
            await page.getByRole('button', { name: 'new note '}).click()
            await page.getByRole('textbox').fill('a new note created by playwright')
            await page.getByRole('button', { name: 'save' }).click()
            await expect(page.getByText('a note created by playwright')).toBeVisible()
        })
    })
})