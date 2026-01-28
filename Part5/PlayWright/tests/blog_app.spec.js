const { describe, test, beforeEach, expect } = require('@playwright/test')
const { decapsulate } = require('node:crypto')

const Login = async (page, username, password) => {
    await page.getByRole('textbox').first().fill(username)  //Gets username textbox from Login Form and fills it
    await page.getByRole('textbox').last().fill(password)   //Gets password textbox from Login Form and fills it
    await page.getByRole('button', { name: 'Login' }).click()   //Submits Login Form
}
const CreateBlog = async (page, title) => {
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
        //Create a secondary user
        await request.post('/api/users', {
            data: {
                name: 'secondary user',
                username: 'secondary',
                password: 'user'
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
            await CreateBlog(page, 'a blog by playwright')
            await expect(page.getByText('a blog by playwright')).toBeVisible()
        })

        describe('and a blog exists', () => {
            beforeEach(async ({ page }) => {
                await CreateBlog(page, 'other blog by playwright')
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

        describe('and three blogs exist', () => {
            beforeEach(async ({ page }) => {
                await CreateBlog(page, 'first blog')
                await CreateBlog(page, 'second blog')
                await CreateBlog(page, 'third blog')
            })

            test.only('blogs are sorted by number of likes', async ({ page }) => {
                //Display blogs' whole content
                await page.getByRole('button', { name: 'Show more' }).nth(0).click()
                await page.getByRole('button', { name: 'Show more' }).nth(0).click()
                await page.getByRole('button', { name: 'Show more' }).nth(0).click()

                await page.getByRole('button', { name: 'like' }).first().click()    //Click first blog's like button once
                //Click second blog's like button twice
                for (let i = 0; i < 2; i++) {   
                    await page.getByRole('button', { name: 'like' }).nth(1).click()        
                }
                //Click third blog's like button three times
                for (let i = 0; i < 3; i++) {
                    await page.getByRole('button', { name: 'like' }).nth(2).click()     
                }
                //Reload the page
                await page.reload()
                //Display blog's whole content again
                await page.getByRole('button', { name: 'Show more' }).nth(0).click()
                await page.getByRole('button', { name: 'Show more' }).nth(0).click()
                await page.getByRole('button', { name: 'Show more' }).nth(0).click()

                //Check top blog
                //Should be third blog with three likes
                await expect(page.getByTestId('blogElement').nth(0)).toHaveText('third blogtestUserLikes: 3  like Url: no url providedShow lessdelete')
                //Check middle blog
                //Should be second blog with two likes
                await expect(page.getByTestId('blogElement').nth(1)).toHaveText('second blogtestUserLikes: 2  like Url: no url providedShow lessdelete')
                //Check bottom blog
                //Should be first blog with one like
                await expect(page.getByTestId('blogElement').nth(2)).toHaveText('first blogtestUserLikes: 1  like Url: no url providedShow lessdelete')
            })
        })
    })

    describe('when other user is logged in', () => {
        beforeEach(async ({ page }) => {
            //Log in
            await Login(page, 'testUser', '0000')
            await expect(page.getByText('matti luukkainen logged-in')).toBeVisible()
            //Create a new note as testUser
            await CreateNote(page, 'a blog by testUser')
            //Log out from testUser
            await page.getByRole('button', { name: 'logout'}).click()
        })

        test('users cant delete other user`s blogs', async ({ page }) => {
            //Log into a secondary account
            await Login(page, 'secondary', 'user')
            await expect(page.getByText('secondary user logged-in')).toBeVisible()
            //trying to delete testUser`s blog
            await page.getByRole('button', { name: 'Show more' }).click()
            await expect(page.getByRole('button', { name: 'Show less' })).toBeVisible()
            await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
        })
    })
})