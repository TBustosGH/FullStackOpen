const { describe, test, beforeEach, expect } = require('@playwright/test')

const Login = async (page, username, password) => {
    await page.getByRole('textbox').first().fill(username)  //Gets username textbox from Login Form and fills it
    await page.getByRole('textbox').last().fill(password)   //Gets password textbox from Login Form and fills it
    await page.getByRole('button', { name: 'Login' }).click()   //Submits Login Form
}
const CreateNote = async (page, title) => {
    await page.getByRole('button', { name: 'Create a new note' }).click()   //Opens Blog Form
    await page.getByRole('textbox').first().fill(title)     //Gets title textbox from Blog Form & fills it
    await page.getByRole('button', { name: 'create' }).click()  //Submits the form
}

describe('Blog App', () => {
    beforeEach(async ({ page, request }) => {
        //Clean testing database
        await request.post('/api/testing/reset')
        //Create a new user
        await request.post('/api/users', {
            data: {
                name: 'matti luukkainen',
                username: 'testUser',
                password: '0000'
            }
        })
        //Load home page
        await page.goto('/')
    })

    test('Login form is shown by default', async ({ page }) => {
        const LoginFormTitle = page.getByText('Log in to the app to see the blogs')
        const loginButton = page.getByRole('button', { name: 'Login' })
        
        await expect(LoginFormTitle).toBeVisible()
        await expect(loginButton).toBeVisible()
    })

    describe('Login test', () => {
        test('Succeeds with correct credentials', async ({ page }) => {
            await Login(page, 'testUser', '0000')
            await expect(page.getByText('matti luukkainen logged-in')).toBeVisible()
        })
        test('Fails with wrong credentials', async ({ page }) => {
            await Login(page, 'wrongUser', 'wrongPassword')
            await expect(page.getByText('Wrong username or password')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await Login(page, 'testUser', '0000')
            await expect(page.getByText('matti luukkainen logged-in')).toBeVisible()
        })

        test('a new blog can be created', async ({ page }) => {
            await CreateNote(page, 'a blog by playwright')
            await expect(page.getByText('a blog by playwright')).toBeVisible()
        })

        describe('and a blog exists', () => {
            beforeEach(async ({ page }) => {
                await CreateNote(page, 'other blog by playwright')
            })

            test('can like blogs', async ({ page }) => {
                await page.getByRole('button', { name: 'Show more' }).click()
                await expect(page.getByText('Likes: 0')).toBeVisible()

                await page.getByRole('button', { name: 'like' }).click()
                await expect(page.getByText('Likes: 1')).toBeVisible()
            })

            test('can delete blogs', async ({ page }) => {
                await page.getByRole('button', { name: 'Show more' }).click()

                page.on('dialog', async dialog => {
                    expect(dialog.type()).toBe('confirm')
                    await dialog.accept()
                })

                await page.getByRole('button', { name: 'delete' }).click()
                
                await expect(page.locator('.statusMessage')).toHaveText('Removed blog other blog by playwright by testUser')
            })
        })
    })
})