import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateRecipeDto) {
    return this.prisma.recipe.create({
      data: {
        title: dto.title,
        description: dto.description,
        instructions: dto.instructions,
        ingredients: dto.ingredients,
        authorId: userId,
      },
    });
  }

  async findAll() {
    const recipes = await this.prisma.recipe.findMany({
      include: {
        author: { select: { email: true } },
        ratings: true,
      },
    });

    return recipes.map((recipe) => {
      const avgRating =
        recipe.ratings.length > 0
          ? recipe.ratings.reduce((sum, r) => sum + r.value, 0) / recipe.ratings.length
          : null;

      return {
        ...recipe,
        avgRating: avgRating !== null ? +avgRating.toFixed(1) : null,
      };
    });
  }

  async findOne(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        author: { select: { email: true } },
        ratings: true,
      },
    });

    if (!recipe) return null;

    const avgRating =
      recipe.ratings.length > 0
        ? recipe.ratings.reduce((sum, r) => sum + r.value, 0) / recipe.ratings.length
        : null;

    return {
      ...recipe,
      avgRating: avgRating !== null ? +avgRating.toFixed(1) : null,
    };
  }

  async findMy(userId: string) {
    const recipes = await this.prisma.recipe.findMany({
      where: { authorId: userId },
      include: {
        author: { select: { email: true } },
        ratings: true,
      },
    });

    return recipes.map((recipe) => {
      const avgRating =
        recipe.ratings.length > 0
          ? recipe.ratings.reduce((sum, r) => sum + r.value, 0) / recipe.ratings.length
          : null;

      return {
        ...recipe,
        avgRating: avgRating !== null ? +avgRating.toFixed(1) : null,
      };
    });
  }

  async update(recipeId: string, userId: string, dto: UpdateRecipeDto) {
    const recipe = await this.prisma.recipe.findUnique({ where: { id: recipeId } });

    if (!recipe || recipe.authorId !== userId) {
      throw new Error('Unauthorized or not found');
    }

    return this.prisma.recipe.update({
      where: { id: recipeId },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.description && { description: dto.description }),
        ...(dto.instructions && { instructions: dto.instructions }),
        ...(dto.ingredients && { ingredients: dto.ingredients }),
      },
    });
  }

  async remove(recipeId: string, userId: string) {
    const recipe = await this.prisma.recipe.findUnique({ where: { id: recipeId } });

    if (!recipe || recipe.authorId !== userId) {
      throw new Error('Unauthorized or not found');
    }

    return this.prisma.recipe.delete({
      where: { id: recipeId },
    });
  }
}
