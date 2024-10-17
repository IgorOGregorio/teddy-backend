import { PartialType } from '@nestjs/swagger';
import { CreateUrlDto } from './create-url.dto';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateUrlDto extends PartialType(CreateUrlDto) {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
