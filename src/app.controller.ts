import { Controller, Get, Param, Res } from '@nestjs/common';
import { Public } from './decorators/isPublicKey.decorator';
import { RedirectUrlService } from './url/services/redirectUrl/redirectUrl.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Redirect')
@Controller('')
export class AppController {
  constructor(private readonly redirectUrlService: RedirectUrlService) {}
  @Public()
  @Get(':code')
  async redirect(@Param('code') code: string, @Res() res) {
    const url = await this.redirectUrlService.execute(code);
    res.status(302).redirect(url);
  }
}
