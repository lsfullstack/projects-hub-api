import { EmailAlreadyExistsError } from '@/errors/email-already-exists.error'
import { UsersRepository } from '@/interfaces/repositories/users-repository.interface'
import {
  CreateUserServiceRequest,
  CreateUserServiceResponse,
} from '@/interfaces/routes/users.interface'
import { hash } from 'bcrypt'

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    name,
    email,
    password,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const passwordHash = await hash(password, 6)

    const emailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })

    return {
      user,
    }
  }
}
