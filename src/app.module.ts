import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { RatingModule } from './rating/rating.module';
import { PrismaModule } from './prisma/prisma.module'; // 

@Module({
  imports: [AuthModule, UserModule, RecipeModule, RatingModule, PrismaModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
