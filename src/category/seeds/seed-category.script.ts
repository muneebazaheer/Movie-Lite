import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { CategoryService } from '../category.service';
import { Category } from '../../category/entities/category.entity';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const categoryService = app.get(CategoryService);
  const categories = JSON.parse(fs.readFileSync('src/category/seeds/seed-category.json', 'utf8'));

  for (const category of categories) {
    const exists = await categoryService.findByName(category.name);
    if (!exists) await categoryService.create(category);
  }

  await app.close();
}
bootstrap();
