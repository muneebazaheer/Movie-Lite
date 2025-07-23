import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UserService } from '../user.service';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from '../dto/create-user.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  const data = fs.readFileSync('src/user/seeds/seed-user.json', 'utf-8');
  const users = JSON.parse(data);

  for (const user of users) {
    const userDto = plainToInstance(CreateUserDto, user);
    const errors = await validate(userDto);

    if (errors.length > 0) {
      console.log(`❌ Validation failed for user ${user.email}:`, errors);
      continue;
    }

    const existing = await userService.findByEmail(user.email);
    if (existing) {
      console.log(`⚠️ User ${user.email} already exists. Skipping.`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    await userService.create({ ...user, password: hashedPassword });
    console.log(`✅ User ${user.email} created successfully.`);
  }

  await app.close();
}

bootstrap();
