import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/isPublicKey.decorator';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './services/auth.service';

@Controller('login')
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { format: 'email' },
        password: {
          example: '12345678',
          type: 'string',
          minLength: 8,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYzZWJjOWZmLWZkYTQtNDM5Ni04YmQ5LWY5NjUxNDIzMDJmNiIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTcyOTEwNTMxNywiZXhwIjoxNzI5MTA4OTE3fQ.iT4qnEjws-fyIaaTHlgH0uF5pPCMI7zvMFsY53ac84c',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized by invalid email or password',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Invalid Email or Invalid Password',
        },
        error: { type: 'string', example: 'Unauthorized' },
        statusCode: { type: 'number', example: 401 },
      },
    },
  })
  async login(@Body() auth: AuthDto): Promise<any> {
    return await this.authService.login(auth);
  }
}
