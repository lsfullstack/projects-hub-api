import { FastifyInstance } from 'fastify'

export const routes = async (app: FastifyInstance) => {
  app.get('/', async (_, reply) => {
    return reply.send('👨‍💻 Welcome to Projects Hub!')
  })
}
