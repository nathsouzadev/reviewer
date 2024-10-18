import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required field' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required field' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
}
