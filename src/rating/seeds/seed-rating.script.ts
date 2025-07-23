import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { RatingService } from '../../rating/rating.service';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const ratingService = app.get(RatingService);
  const ratings = JSON.parse(fs.readFileSync('src/rating/seeds/seed-rating.json', 'utf8'));

  for (const rating of ratings) {
    await ratingService.create2(rating);
  }

  await app.close();
}
bootstrap();
