import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  url: string;
}
