import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

export class RevivewDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required field' })
  @IsUrl({ protocols: ['https'] }, { message: 'Invalid URL' })
  url: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required field' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
}
