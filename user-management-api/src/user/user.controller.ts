import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@ApiTags('Gerenciamento de Usuários')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria um novo usuário',
    description: 'Cria um novo usuário com os dados fornecidos',
  })
  @ApiBody({
    type: CreateUserDTO,
    description: 'Dados do usuário a ser criado',
    examples: {
      exemplo1: {
        value: {
          name: 'João Silva',
          email: 'joao@exemplo.com',
          birthDate: '1990-01-01',
          status: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    schema: {
      example: {
        user: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'João Silva',
          email: 'joao@exemplo.com',
          birthDate: '1990-01-01T00:00:00.000Z',
          status: true,
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async createUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todos os usuários',
    description:
      'Retorna uma lista com todos os usuários cadastrados no sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    schema: {
      type: 'array',
      items: {
        example: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'João Silva',
          email: 'joao@exemplo.com',
          birthDate: '1990-01-01T00:00:00.000Z',
          status: true,
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Busca um usuário específico',
    description: 'Retorna os dados de um usuário específico baseado no ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'João Silva',
        email: 'joao@exemplo.com',
        birthDate: '1990-01-01T00:00:00.000Z',
        status: true,
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza um usuário',
    description: 'Atualiza os dados de um usuário específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário a ser atualizado',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    type: CreateUserDTO,
    description: 'Dados do usuário a serem atualizados',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async updateUser(@Param('id') id: string, @Body() data: CreateUserDTO) {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove um usuário',
    description: 'Remove permanentemente um usuário do sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário a ser removido',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Usuário removido com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
