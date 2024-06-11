/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home', { version: 6 })

router.group(() => {
    router.on('/login').renderInertia('auth/login')
    router.on('/register').renderInertia('auth/register')
}).prefix('auth')

