import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Head,
  Options,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserService } from './services/createUser/createUser.service';
import { FindByEmailService } from './services/findByEmail/findByEmail.service';
import { User } from './entities/user.entity';
import { FindAllService } from './services/findAll/findAll.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../decorators/isPublicKey.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findByEmailService: FindByEmailService,
    private readonly findAllService: FindAllService,
  ) {}

  @Head()
  @ApiOperation({ summary: 'Verify status' })
  @ApiResponse({
    status: 200,
    description: 'Head',
  })
  @ApiResponse({
    status: 404,
    description: 'Method Not Found',
  })
  async head() {}

  @Options()
  @ApiOperation({ summary: 'Show user options' })
  @ApiResponse({
    status: 200,
    description: 'Options',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          method: { type: 'string', example: 'GET' },
          description: { type: 'string', example: 'Get all users' },
          route: { type: 'string', example: '/user/all' },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Method Not Found',
  })
  async options() {
    return [
      {
        method: 'HEAD',
        description: 'Head',
        route: '/user',
      },
      {
        method: 'OPTIONS',
        description: 'Options',
        route: '/user',
      },
      {
        method: 'GET',
        description: 'Get all users',
        route: '/user/all',
      },
      {
        method: 'POST',
        description: 'Create a user',
        route: '/user',
      },
      {
        method: 'GET',
        description: 'Find user by email',
        route: '/user/email/:email',
      },
    ];
  }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'User created',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'f3ebc9ff-fda4-4396-8bd9-f965142302f6' },
        name: { type: 'string', example: 'User Name' },
        email: { type: 'string', example: 'user@example.com' },
        createdAt: {
          type: 'string',
          example: new Date().toLocaleString(process.env.TZ),
        },
        updatedAt: {
          type: 'string',
          example: new Date().toLocaleString(process.env.TZ),
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Email already exists',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Email already exists' },
        error: { type: 'string', example: 'Bad Request' },
        statusCode: { type: 'number', example: 400 },
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { format: 'email', type: 'string' },
        name: { type: 'string', example: 'User Name' },
        password: { type: 'string', example: '12345678', minLength: 8 },
      },
    },
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const user: User = await this.createUserService.execute(createUserDto);
    return user.toJson();
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Find one user by email' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'f3ebc9ff-fda4-4396-8bd9-f965142302f6' },
        name: { type: 'string', example: 'User Name' },
        email: { type: 'string', example: 'user@example.com' },
        createdAt: {
          type: 'string',
          example: new Date().toLocaleString(process.env.TZ),
        },
        updatedAt: {
          type: 'string',
          example: new Date().toLocaleString(process.env.TZ),
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'User not found' },
        error: { type: 'string', example: 'Not Found' },
        statusCode: { type: 'number', example: 404 },
      },
    },
  })
  @ApiParam({
    name: 'email',
    format: 'email',
    required: true,
    type: 'string',
    description: 'User email',
    example: 'user@example.com',
  })
  async findByEmail(@Param('email') email: string) {
    const user: User = await this.findByEmailService.execute(email);
    return user.toJson();
  }

  @Get('all')
  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({
    status: 200,
    description: 'Users found',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'f3ebc9ff-fda4-4396-8bd9-f965142302f6',
          },
          name: { type: 'string', example: 'User Name' },
          email: { type: 'string', example: 'user@example.com' },
          createdAt: {
            type: 'string',
            example: new Date().toLocaleString(process.env.TZ),
          },
          updatedAt: {
            type: 'string',
            example: new Date().toLocaleString(process.env.TZ),
          },
        },
      },
    },
  })
  async findAll() {
    const users: User[] = await this.findAllService.execute();
    return users.map((user) => user.toJson());
  }
}
