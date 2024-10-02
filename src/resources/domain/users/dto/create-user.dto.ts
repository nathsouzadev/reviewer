import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto  {
  @IsNotEmpty({ message: 'Required field' })
  name: string;

  @IsNotEmpty({ message: 'Required field' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
}
