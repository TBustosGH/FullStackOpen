const { describe, test, expect, beforeEach } = require('@playwright/test')

describe('Note app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3002/api/testing/reset')
        await request.post('http://localhost:3002/api/users', {
            data: {
                name: 'username: testUSer, password: 0000',
                username: 'testUser',
                password: '0000'
            }
        })
        
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

    test('login fails with wrong password', async ({ page }) => {
        //log in attempt with wrong credentials
        await page.getByRole('button', { name: 'log in' }).click()
        await page .getByTestId('username').fill('testUser')
        await page.getByTestId('password').fill('wrong')
        await page.getByRole('button', { name: 'Log in' }).click()
        //Locate error message
        const errorDiv = await page.locator('.ErrorMessage')
        await expect(errorDiv).toContainText('Wrong credentials')
        //Check if user is not logged in
        await expect(page.getByText('username: testUSer, password: 0000 logged-in')).not.toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            //log in
            await page.getByRole('button', { name: 'log in' }).click()
            await page.getByTestId('username').fill('testUser')
            await page.getByTestId('password').fill('0000')
            await page.getByRole('button', { name: 'Log in'}).click()
            await expect(page.getByText('username: testUser, password: 0000 logged-in')).toBeVisible()
        })
        
        test('a new note can be created', async ({ page }) => {
            //Create a new note
            await page.getByRole('textbox').fill('a new note created by playwright')
            await page.getByRole('button', { name: 'save' }).click()
            await expect(page.getByText('a new note created by playwright')).toBeVisible()
        })

        describe('and a note exists', () => {
            beforeEach(async ({ page }) => {
                await page.getByRole('textbox').fill('another note by playwright')
                await page.getByRole('button', { name: 'save' }).click()
            })

            test('importance can be changed', async ({ page }) => {
                await page.getByRole('button', { name: 'make important' }).click()
                await expect(page.getByText('make not important')).toBeVisible()
            })
        })
    })
})