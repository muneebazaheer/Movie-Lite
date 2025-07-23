import { Controller, Post, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() dto: CreateRatingDto) {
    return this.ratingService.create(req.user.id, dto);
  }

  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @Get('movie/:movieId')
  findByMovie(@Param('movieId') movieId: string) {
    return this.ratingService.findByMovie(+movieId);
  }

  @Get('movie/:movieId/average')
  average(@Param('movieId') movieId: string) {
    return this.ratingService.averageRating(+movieId);
  }
}
