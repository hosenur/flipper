import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')
import { middleware } from '#start/kernel'
import FlagsController from "#controllers/flags_controller";
router.on('/').renderInertia('home', { version: 6 })

router
  .group(() => {
    router.on('/login').renderInertia('auth/login')
    router.on('/register').renderInertia('auth/register')
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])
  })
  .prefix('/auth')
  .use(middleware.guest())

router
  .group(() => {
    router.on('/').renderInertia('dashboard')
    router.on('/projects').renderInertia('projects')
  })
  .use(middleware.auth())
  .prefix('/dashboard')

router
  .group(() => {
    router.get('/flags', [FlagsController, 'index'])
  })
  .prefix('/api')
  .use(middleware.api())
