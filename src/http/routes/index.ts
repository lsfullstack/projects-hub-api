import { FastifyInstance } from 'fastify'
import { createUserController } from '../controllers/users'

export const routes = async (app: FastifyInstance) => {
  app.get('/', async (_, reply) => {
    return reply.send('👨‍💻 Welcome to Projects Hub!')
  })

  // user routes
  app.post('/users', createUserController)
}
