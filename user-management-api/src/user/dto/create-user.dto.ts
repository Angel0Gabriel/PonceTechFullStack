import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty({
    message: 'O campo deve ser preenchido.',
  })
  @Length(3, 100, { message: 'Insira pelo menos 3 caracteres.' })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao@exemplo.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'Insira um email válido.' })
  email: string;

  @ApiProperty({
    description: 'Data de nascimento do usuário',
    example: '1990-01-01',
    format: 'date',
  })
  @IsNotEmpty({ message: 'O campo deve ser preenchido.' })
  @IsDateString()
  birthDate: string;

  @ApiProperty({
    description: 'Status do usuário (ativo/inativo)',
    example: true,
    type: Boolean,
  })
  @IsBoolean({ message: 'Valor inválido.' })
  status: boolean;
}
