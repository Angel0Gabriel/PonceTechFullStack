import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(body: CreateUserDTO) {
    const { name, email, birthDate, status } = body;

    const user = await this.prisma.user.create({
      data: {
        id: randomUUID(),
        name,
        email,
        birthDate,
        status,
      },
    });

    return {
      user,
    };
  }

  async getUsers() {
    return await this.prisma.user.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getUserById(id: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async updateUser(id: string, data: CreateUserDTO) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
