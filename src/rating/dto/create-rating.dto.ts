import { IsInt, Min, Max } from 'class-validator';

export class CreateRatingDto {
  recipeId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  value: number;
}
