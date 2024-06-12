import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')
import { middleware } from '#start/kernel'
router.on('/').renderInertia('home', { version: 6 })

router
  .group(() => {
    router.on('/login').renderInertia('auth/login')
    router.on('/register').renderInertia('auth/register')
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])
  })
  .prefix('/auth')

router
  .group(() => {
    router.on('/dashboard').renderInertia('dashboard')
  })
  .use(middleware.auth())
