// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import Key from '#models/key'

export default class FlagsController {
  async index({ request, response }: HttpContext) {
    const token = request.header('Authorization')
    const key = await Key.findBy('token', token)
    return response.status(200).json({ message: 'Hello world' })
  }
}
