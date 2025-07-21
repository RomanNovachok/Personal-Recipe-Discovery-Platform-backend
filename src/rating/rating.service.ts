import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async rate(userId: string, dto: CreateRatingDto) {
    const existing = await this.prisma.rating.findFirst({
      where: {
        userId,
        recipeId: dto.recipeId,
      },
    });

    if (existing) {
      return this.prisma.rating.update({
        where: { id: existing.id },
        data: {
          value: dto.value,
        },
      });
    }

    return this.prisma.rating.create({
      data: {
        value: dto.value,
        recipeId: dto.recipeId,
        userId,
      },
    });
  }

}
