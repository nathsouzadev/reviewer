import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './service/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadGatewayResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { randomUUID } from 'crypto';

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Grace Hooper' },
        email: { type: 'string', example: 'grace@reprograma.com.br' },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' },
        name: { type: 'string', example: 'Grace Hooper' },
        email: { type: 'string', example: 'grace@reprograma.com.br' },
      },
    },
    example: {
      id: randomUUID(),
      name: 'Grace Hooper',
      email: 'grace@reprograma.com.br',
    },
  })
  @ApiBadGatewayResponse({
    description: 'Internal server error',
    example: {
      message: 'Internal server error',
    },
  })
  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' },
        name: { type: 'string', example: 'Grace Hooper' },
        email: { type: 'string', example: 'grace@reprograma.com.br' },
      },
    },
    example: [
      {
        id: randomUUID(),
        name: 'Grace Hooper',
        email: 'grace@reprograma.com.br',
      },
    ],
  })
  @ApiNotFoundResponse({
    description: 'No records found',
    example: {
      message: 'Users not found!',
    },
  })
  @Get()
  async get() {
    return this.usersService.get();
  }

  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' },
        name: { type: 'string', example: 'Grace Hooper' },
        email: { type: 'string', example: 'grace@reprograma.com.br' },
      },
    },
    example: [
      {
        id: randomUUID(),
        name: 'Grace Hooper',
        email: 'grace@reprograma.com.br',
      },
    ],
  })
  @ApiNotFoundResponse({
    description: 'No records found',
    example: {
      message: 'Users not found!',
    },
  })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Grace Hooper' },
        email: { type: 'string', example: 'grace@reprograma.com.br' },
      },
    },
  })
  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' },
        name: { type: 'string', example: 'Grace Hooper' },
        email: { type: 'string', example: 'grace@reprograma.com.br' },
      },
    },
    example: [
      {
        id: randomUUID(),
        name: 'Grace Hooper',
        email: 'grace@reprograma.com.br',
      },
    ],
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    example: {
      id: randomUUID(),
      message: 'User deleted',
    },
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
