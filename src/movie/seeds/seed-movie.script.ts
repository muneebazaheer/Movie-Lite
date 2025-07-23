import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { MovieService } from '../../movie/movie.service';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const movieService = app.get(MovieService);
  const movies = JSON.parse(fs.readFileSync('src/movie/seeds/seed-movie.json', 'utf8'));

  for (const movie of movies) {
    const exists = await movieService.findByTitle(movie.title);
    if (!exists) await movieService.create(movie);
  }

  await app.close();
}
bootstrap();
