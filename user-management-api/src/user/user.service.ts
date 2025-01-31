import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(createUserDTO: CreateUserDTO) {
    return this.userRepository.createUser(createUserDTO);
  }

  async getUsers() {
    return this.userRepository.getUsers();
  }

  async getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }

  async updateUser(id: string, data: CreateUserDTO) {
    return this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
