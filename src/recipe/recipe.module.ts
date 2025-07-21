import { Module } from '@nestjs/common';
import { RecipesService } from './recipe.service';
import { RecipesController } from './recipe.controller';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipeModule {}
