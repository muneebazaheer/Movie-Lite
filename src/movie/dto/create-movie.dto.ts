import { IsNumber, IsString } from "class-validator";

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsNumber()
  categoryId: number;
}
