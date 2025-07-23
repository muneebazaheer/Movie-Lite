import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { MovieModule } from './movie/movie.module';
import { RatingModule } from './rating/rating.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/entities/category.entity';
import { User } from './user/entities/user.entity';
import { Movie } from './movie/entities/movie.entity';
import { Rating } from './rating/entities/rating.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    database: 'movieDB',
    password:'1234578',
    entities: [Category, User, Movie, Rating],
    synchronize: false,
    }),
    UserModule, CategoryModule, MovieModule, RatingModule, RecommendationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}