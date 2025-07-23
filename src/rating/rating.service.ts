import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { User } from '../user/entities/user.entity';
import { Movie } from '../movie/entities/movie.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepo: Repository<Rating>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
  ) {}

async create2(ratingData: { value: number; movieId: number; userID: number }) {
  const movie = await this.movieRepo.findOneBy({ id: ratingData.movieId });
  const user = await this.userRepo.findOneBy({ id: ratingData.userID });

  if (!movie || !user) {
    throw new Error('Movie or User not found');
  }

  const rating = this.ratingRepo.create({
    value: ratingData.value,
    movie,
    user,
  });

  return this.ratingRepo.save(rating);
}


  async create(userId: number, dto: CreateRatingDto) {
    const movie = await this.movieRepo.findOneBy({ id: dto.movieId });
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!movie) throw new NotFoundException('Movie not found');
    if (!user) throw new NotFoundException('User not found');

    const rating = this.ratingRepo.create({
      user,
      movie,
      value: dto.value,
    });

    return this.ratingRepo.save(rating);
  }

  async findAll() {
    return this.ratingRepo.find({
      relations: ['user', 'movie'],
    });
  }

  async findByMovie(movieId: number) {
    return this.ratingRepo.find({
      where: { movie: { id: movieId } },
      relations: ['user'],
    });
  }

  async averageRating(movieId: number) {
    const ratings = await this.ratingRepo.find({ where: { movie: { id: movieId } } });
    const total = ratings.reduce((sum, r) => sum + r.value, 0);
    const avg = ratings.length ? total / ratings.length : 0;
    return { average: parseFloat(avg.toFixed(2)), count: ratings.length };
  }
}
