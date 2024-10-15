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
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
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
    example: [
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
        body: {
          email: 'string',
          name: 'string',
          password: 'string',
        },
      },
      {
        method: 'GET',
        description: 'Find user by email',
        route: '/user/email/:email',
      },
    ],
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
        body: {
          email: 'string',
          name: 'string',
          password: 'string',
        },
      },
      {
        method: 'GET',
        description: 'Find user by email',
        route: '/user/email/:email',
      },
    ];
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'User created',
    example: {
      id: 'f3ebc9ff-fda4-4396-8bd9-f965142302f6',
      name: 'User Name',
      email: 'user@example.com',
      createdAt: new Date().toLocaleString(process.env.TZ),
      updatedAt: new Date().toLocaleString(process.env.TZ),
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Email already exists',
    example: {
      message: 'Email already exists',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { format: 'email' },
        name: { example: 'User Name', type: 'string' },
        password: {
          example: '12345678',
          type: 'string',
          minLength: 8,
        },
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
    type: User,
    example: {
      id: 'f3ebc9ff-fda4-4396-8bd9-f965142302f6',
      name: 'User Name',
      email: 'user@example.com',
      createdAt: new Date().toLocaleString(process.env.TZ),
      updatedAt: new Date().toLocaleString(process.env.TZ),
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    example: {
      message: 'User not found',
      error: 'Not Found',
      statusCode: 404,
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
    description: 'User found',
    type: User,
    example: [
      {
        id: 'f3ebc9ff-fda4-4396-8bd9-f965142302f6',
        name: 'User Name',
        email: 'user@example.com',
        createdAt: new Date().toLocaleString(process.env.TZ),
        updatedAt: new Date().toLocaleString(process.env.TZ),
      },
      {
        id: 'h45gv9ff-fda4-4396-67gd-f965142302f6',
        name: 'User Name 2',
        email: 'user2@example.com',
        createdAt: new Date().toLocaleString(process.env.TZ),
        updatedAt: new Date().toLocaleString(process.env.TZ),
      },
    ],
  })
  async findAll() {
    const users: User[] = await this.findAllService.execute();
    return users.map((user) => user.toJson());
  }
}
