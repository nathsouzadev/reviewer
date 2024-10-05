import { IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

export class RevivewDto {
  @IsNotEmpty({ message: 'Required field' })
  @IsUrl({ protocols: ['https'] }, { message: 'Invalid URL' })
  url: string;

  @IsNotEmpty({ message: 'Required field' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
}
