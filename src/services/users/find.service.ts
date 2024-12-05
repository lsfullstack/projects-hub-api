import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { UsersRepository } from '@/interfaces/repositories/users-repository.interface'
import { FindUserServiceResponse } from '@/interfaces/routes/users.interface'

export class FindUserService {
  constructor(private userRepository: UsersRepository) {}

  async execute(id: string): Promise<FindUserServiceResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user: {
        ...user,
        password_hash: undefined,
      },
    }
  }
}
