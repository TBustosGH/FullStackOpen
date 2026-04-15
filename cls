[33mcommit 921d48ca537d3a16208e19df97682254afbad249[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m)[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Fri Apr 10 09:01:16 2026 -0300

    Feat: example from part 8-2
    ---apolloClient---
    -Add components folder
    -Add PersonForm.jsx and PhoneForm.jsx inside components folder
    -Add queries folder
    -Add queries.js inside of queries folder, with ALL_PERSONS, FIND_PERSONS, CREATE_PERSONS and EDIT_NUMBER queries
    -Import PersonForm and PhoneForm into App.jsx
    -Add Notify component into App.jsx
    -Add errorMessage state in App.jsx

[33mcommit 470d3e82286f1a70236b65ad94f1728a973b7c1b[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Thu Apr 9 09:01:56 2026 -0300

    Feat: example from part 8-2
    -Create apolloClient
    ---apolloClient---
    -Install @apollo/client & graphql
    -Change main.jsx, to import from @apollo/client, create a client to manage queries and provide the client to App
    -Change App.jsx, to define and make queries to the server (part8/GraphQL), receive data and display it on screen

[33mcommit d5680ed6a2118988ef1b29c671c54a73f3a801d9[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Wed Apr 8 08:50:28 2026 -0300

    Feat: exercise 8-7 from part 8-1
    ---booksWithGraphQL---
    -Add editAuthor into type Mutation (typeDefs)
    -Add editAuthor into Mutation (resolvers)

[33mcommit c9b227fc29cc78cfb2ce03fe6ada82746ab3ba09[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Wed Apr 8 08:36:55 2026 -0300

    Feat: exercise 8-6 from part 8-1
    ---booksWithGraphQL---
    -Add addAuthor and addBook into type Mutation (typeDefs)
    -Add addAuthor and addBook into Mutation (resolvers)

[33mcommit 1de92120913a7442c998d88aaaa35fb0dbd819a1[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Tue Apr 7 23:26:35 2026 -0300

    Refactor: exercise 8-5 from part 8-1
    ---booksWithGraphQL---
    -Change allBooks query
    -Now allBooks is able to receive up to two arguments, author and genre, to filter the return of the books

[33mcommit 2ac316b9800a7edcc01bd3c910bb0119e3092faf[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Tue Apr 7 23:07:02 2026 -0300

    Refactor: exercise 8-4 from part 8-1
    ---booksWithGraphQL---
    -Add author as an argument into allBooks
    -allBooks will now return ONLY books from a specified author, or all books if there`s no such author

[33mcommit 7db6b0bdd891e722478863ec6686fc2bfe60c485[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Tue Apr 7 23:01:01 2026 -0300

    Feat: exercise 8-3 from part 8-1
    ---booksWithGraphQL---
    -Add allAuthors into Query (resolver & typeDefs)
    -Add bookCount property into Author schema (typeDefs)
    -Add Author into resolvers to properly control bookCount from Author

[33mcommit 3f8d6e82320e58c4535de57752fc6b6fc02808af[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Tue Apr 7 22:43:08 2026 -0300

    Feat: exercise 8-2 from part 8-1
    ---booksWithGraphQL---
    -Add allBooks into Query (typeDefs)
    -dd allBooks into Query (resolvers)

[33mcommit d592a0440a7f0f22752618c34a9c6d8026460f4f[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Tue Apr 7 22:38:15 2026 -0300

    Feat: exercise 8-1 from part 8-1
    -Create booksWithGraphQL
    ---booksWithGraphQL---
    -Install @apollo/server graphql
    -Add index.js
    -Copy some example code
    -Add type Author, type Book, authorCount and bookCount into typeDefs
    -Add authorCount and bookCount into resolvers

[33mcommit 8a21369930314f281d7d969cce544a6f987c87c1[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Tue Apr 7 09:07:25 2026 -0300

    Feat: example from part 8-1
    -Create Part8 folder
    -Create GraphQL folder into Part8
    ---GraphQL---
    -Install @apollo/server graphql
    -Add index.js
    -Add graphql types (Address, Person, Query) and mutations (addPerson, editNumber)
    -Add resolvers (Query, Person, Mutation)
    -Add a simple configuration for the apollo server

[33mcommit 95cd94baa9376c507831525e99605ab9a6fe99aa[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Mon Apr 6 09:32:35 2026 -0300

    Feat: exercise 7-19 from part 7-6
    ---BlogApp/Frontend---
    -Add CommentForm  as a component into Blog
    -Add postComment into services/blogs.js, to post a new comment into a specific blog
    -Now users can post comments into blogs

[33mcommit 9d8e2589473732969e4b82a09cdb3d0d61cbc80e[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Mon Apr 6 09:02:45 2026 -0300

    Feat: exercise 7-18 from part 7-6
    ---BlogApp/Backend---
    -Add /api/blogs/:id/comments endpoint, to post a comment in a blog,
    -Change blogs model, to now create a void object into new blog, to contain the comments
    ---BlogApp/Frontend---
    -Add a comments section into Blog component, it`ll read the comments and display them in an unorganized list, or show a message when there are no comments

[33mcommit a2beec5cfba24ecadf57f53a25d7ec218964f3f0[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Sat Apr 4 13:13:21 2026 -0300

    Feat: exercise 7.17 from part 7-6
    ---BlogApp/Frontend---
    -Delete components/Home.jsx
    -Add components/Navbar.jsx
    -Change Blogs`s route, from /blogs to /

[33mcommit 844f88077a027411acde8bae7fb08a81ca4d544e[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Fri Apr 3 23:33:21 2026 -0300

    Refactor: exercise 7-16 from part 7-6
    ---BlogApp/Frontend---
    -Change Home.jsx, it`ll no longer display blogs, but contains links to /blogs and /users
    -Move display blogs to it`s own route, /blogs
    -Change Blog.jsx, to containt Blog, to show a specific blog`s whole information in it`s own route, /blogs/:id; & Blogs, to show an unorganized list of all blogs
    -Add getBlogById, into services/blogs.js, to obtain a specific blog from the server

[33mcommit b1cc0604bc6ddef0aa42edd7c51b8012404470c0[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Fri Apr 3 22:38:47 2026 -0300

    Feat: exercise 7-15 from part 7-6
    ---BlogApp/Frontend---
    -Add User into Users.jsx, it`ll show all the information of an individual user
    -Add /user/:id route to App.jsx
    -Add getUserById into users.js
    ---BlogApp/Backend---
    -Add /users/:id entrypoint to the backend, add usersRouter.get(/:id) into controllers/users.js

[33mcommit 67b1b2f30f03abda7d4106734fa75c2e8fc8ac5c[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Fri Apr 3 21:49:22 2026 -0300

    Refactor: exercise 7-14 from part 7-6
    ---BlogApp/Frontend---
    -IT FINALLY WORKS!!!!!!!!!!
    -Finish exercise 7-14 up
    -Now /users works fine, it shows a table, with all users and the number of blogs they´d created

[33mcommit 7937aa084a3afb1b60c978344f3bb2b9a85e6306[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Fri Apr 3 19:06:39 2026 -0300

    Feat: exercise 7-1 from part 7-6
    ---BlogApp/Frontend---
    -Add services/users.js
    -Install react-router-dom
    -Install @mui/materials
    -Add components/Home.jsx
    -Add components/Users.jsx
    -Add Router into main.jsx
    -Add Routes into App.jsx
    --NOTES:
    -/users, is not working, the exercise is incomplete
    
    FUCKING OBJECTS!!!!!!!!

[33mcommit 155ac2e9b9bffae759890da2e0aa9120a249488f[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Wed Apr 1 08:59:22 2026 -0300

    Refactor: exercise 7-13 (React Query) from part 7-6
    ---BlogApp/FrontEnd---
    -Add UserContext.jsx
    -Add UserContext to Main.jsx
    -Use UserContext to store login data, in LoginForm.jsx & App.jsx (handleLogin); instead of reducers and useSelector
    --As my React Query contexts worked I decided to:
    -Delete store.js
    -Delete Reducers folder
    --as I will no longer need them

[33mcommit 4236794c3a309866a6bf2a19a37c0c67117071e2[m
Author: TBustosGH <tnbustos2007@gmail.com>
Date:   Tue Mar 31 09:07:58 2026 -0300

    Refactor: exercises 7-11 & 7-12 (react query) from part 7-6
    -Add contexts/BlogContext.jsx
    -Add BlogContext to Main.jsx
    -Change components/BLogForm.jsx to use reactQuery and blogContext
    -Can cre