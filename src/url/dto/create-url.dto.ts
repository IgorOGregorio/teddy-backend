import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
