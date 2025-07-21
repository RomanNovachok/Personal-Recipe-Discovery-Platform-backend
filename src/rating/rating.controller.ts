import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthRequest } from '../types/auth-request.interface';

@UseGuards(JwtAuthGuard)
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  rate(@Req() req: AuthRequest, @Body() dto: CreateRatingDto) {
    return this.ratingService.rate(req.user.userId, dto);
  }
}
