import { IsNumber, isNumber } from "class-validator";

export class CreateRatingDto {

  @IsNumber()
  movieId: number;

  @IsNumber()
  value: number;
}
