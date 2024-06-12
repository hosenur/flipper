import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async register({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const existingUser = await User.findBy('email', email)
    if (existingUser) {
      return response.status(409).json({ message: 'Email already exists' })
    }
    const user = await User.create({ email, password })
    await auth.use('web').login(user)
    return response.redirect('/dashboard')
  }

  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)
    return response.redirect('/dashboard')
  }
}
