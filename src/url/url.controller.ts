import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUrlService } from './services/createUrl/createUrl.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/isPublicKey.decorator';
import { JwtService } from '@nestjs/jwt';
import { GetUser } from '../decorators/user.decorator';
import { AuthPayload } from '../auth/jwt.strategy';
import { FindUrlsByUserIdService } from './services/findUrlsByUserId/findUrlsByUserId.service';
import { UpdateUrlService } from './services/updateUrl/updateUrl.service';
import { UpdateUrlDto } from './dto/update-url.dto';
import { DeleteUrlService } from './services/deleteUrl/deleteUrl.service';

@ApiTags('Url')
@Controller('url')
export class UrlController {
  constructor(
    private readonly createUrlService: CreateUrlService,
    private readonly jwtService: JwtService,
    private readonly findUrlsByUserId: FindUrlsByUserIdService,
    private readonly updateUrlService: UpdateUrlService,
    private readonly deleteUrlService: DeleteUrlService,
  ) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create an url with user or not' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          format: 'url',
          example: 'https://google.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'a9dbe345-3f9d-439c-9797-c3d2d175cdf8' },
        url: { type: 'string', example: 'https://google.com' },
        shortUrl: {
          type: 'string',
          example: 'as6g34',
        },
        accessCount: { type: 'number', example: 0 },
        createdAt: {
          type: 'string',
          example: '17/10/2024, 09:23:42',
        },
        updatedAt: { type: 'string', example: '17/10/2024, 09:23:42' },
        deletedAt: {
          example: null,
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'When creating a url with logged user but not find him',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'User not found' },
        error: { type: 'string', example: 'Not Found' },
        statusCode: { type: 'number', example: 404 },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Some error description' },
        error: { type: 'string', example: 'Bad Request' },
        statusCode: { type: 'number', example: 400 },
      },
    },
  })
  create(@GetUser() user: AuthPayload, @Body() createUrlDto: CreateUrlDto) {
    console.log(user);
    return this.createUrlService.execute(createUrlDto, user ? user.id : null);
  }

  @Get('user')
  @ApiOperation({ summary: 'List urls from an user' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'array',
      items: {
        properties: {
          id: {
            type: 'string',
            example: 'a9dbe345-3f9d-439c-9797-c3d2d175cdf8',
          },
          url: { type: 'string', example: 'https://google.com' },
          shortUrl: {
            type: 'string',
            example: 'as6g34',
          },
          accessCount: { type: 'number', example: 0 },
          createdAt: {
            type: 'string',
            example: '17/10/2024, 09:23:42',
          },
          updatedAt: { type: 'string', example: '17/10/2024, 09:23:42' },
          deletedAt: {
            example: null,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Some error description' },
        error: { type: 'string', example: 'Bad Request' },
        statusCode: { type: 'number', example: 400 },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found any url to this user',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Not found any url to this user' },
        error: { type: 'string', example: 'Not Found' },
        statusCode: { type: 'number', example: 404 },
      },
    },
  })
  findUrlsByUser(@GetUser() user: AuthPayload) {
    return this.findUrlsByUserId.execute(user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an url' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          format: 'url',
          example: 'https://google.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'a9dbe345-3f9d-439c-9797-c3d2d175cdf8' },
        url: { type: 'string', example: 'https://google.com' },
        shortUrl: {
          type: 'string',
          example: 'as6g34',
        },
        accessCount: { type: 'number', example: 0 },
        createdAt: {
          type: 'string',
          example: '17/10/2024, 09:23:42',
        },
        updatedAt: { type: 'string', example: '17/10/2024, 09:23:42' },
        deletedAt: {
          example: null,
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User does not own the url or Url is deleted',
        },
        error: { type: 'string', example: 'Bad Request' },
        statusCode: { type: 'number', example: 400 },
      },
    },
  })
  updateUrl(
    @GetUser() user: AuthPayload,
    @Param('id') urlId: string,
    @Body() data: UpdateUrlDto,
  ) {
    return this.updateUrlService.execute(urlId, data, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an url' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Url deleted' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User does not own the url or Url is already deleted',
        },
        error: { type: 'string', example: 'Bad Request' },
        statusCode: { type: 'number', example: 400 },
      },
    },
  })
  deleteUrl(@GetUser() user: AuthPayload, @Param('id') urlId: string) {
    return this.deleteUrlService.execute(urlId, user.id);
  }
}
