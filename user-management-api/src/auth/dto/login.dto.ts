import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email inválido' })
  @ApiProperty()
  email: string;
}
