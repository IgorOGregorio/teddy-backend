import { IsUrl, IsString, IsNotEmpty } from 'class-validator';

export class UpdateUrlDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
