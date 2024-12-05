import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { describe, expect, it } from 'vitest'
import { CreateUserService } from './create.service'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { FindUserService } from './find.service'

describe('Find user', () => {
  it('should be able to find a user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    const { user } = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
    })

    const findUser = await usersRepository.findById(user.id)

    expect(findUser!.id).toEqual(user.id)
  })

  it('should not be able to find a non-existing user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserService = new CreateUserService(usersRepository)
    const findUserService = new FindUserService(usersRepository)

    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '@Password123',
    })

    await expect(() =>
      findUserService.execute('generic-id'),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
