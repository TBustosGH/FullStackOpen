const { describe, test, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote, createOtherNote } = require('./helper')

describe('Note app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'username: testUSer, password: 0000',
                username: 'testUser',
                password: '0000'
            }
        })
        
        await page.goto('/')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
    })

    test('user can log in with correct credentials', async ({ page }) => {
        await loginWith(page, 'testUser', '0000')
        await expect(page.getByText('username: testUSer, password: 0000 logged-in')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
        //log in attempt with wrong credentials
        await loginWith(page, 'testUser', 'wrongPassword')
        //Locate error message
        const errorDiv = await page.locator('.ErrorMessage')
        await expect(errorDiv).toContainText('Wrong credentials')
        //Check if user is not logged in
        await expect(page.getByText('username: testUSer, password: 0000 logged-in')).not.toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            //log in
            await loginWith(page, 'testUser', '0000')
            await expect(page.getByText('username: testUser, password: 0000 logged-in')).toBeVisible()
        })
        
        test('a new note can be created', async ({ page }) => {
            //Create a new note
            await createNote(page, 'a new note created by playwright')
            await expect(page.getByText('a new note created by playwright')).toBeVisible()
        })

        describe('and a note exists', () => {
            beforeEach(async ({ page }) => {
                await createNote(page, 'first note')
                await createOtherNote(page, 'second note')
                await createOtherNote(page, 'third note')
            })
            test('one of those can be made important', async ({ page}) => {
                const NoteText = await page.getByText('second note')
                const NoteElement = await NoteText.locator('..')

                await NoteElement.getByRole('button', { name: 'make important' }).click()
                await expect(NoteElement.getByText('make not important')).toBeVisible
            })
        })
    })
})