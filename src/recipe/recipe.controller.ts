import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { RecipesService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthRequest } from '../types/auth-request.interface';
import { Param } from '@nestjs/common';
import { Patch, Delete } from '@nestjs/common';
import { UpdateRecipeDto } from './dto/update-recipe.dto';


@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: AuthRequest, @Body() dto: CreateRecipeDto) {
    return this.recipesService.create(req.user.userId, dto);
  }

  @Get()
  async findAll() {
    const recipes = await this.recipesService.findAll();

    return recipes.map((recipe) => {
      const avgRating =
        recipe.ratings.length > 0
          ? recipe.ratings.reduce((sum, r) => sum + r.value, 0) / recipe.ratings.length
          : null;

      return {
        ...recipe,
        avgRating: avgRating ? +avgRating.toFixed(1) : null,
      };
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMy(@Req() req: AuthRequest) {
    const result = this.recipesService.findMy(req.user.userId);
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: AuthRequest,
    @Body() dto: UpdateRecipeDto,
  ) {
    return this.recipesService.update(id, req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.recipesService.remove(id, req.user.userId);
  }
}
