import { Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { ILike, Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class MovieService {
    constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

 async create(dto: CreateMovieDto) {
    const category = await this.categoryRepo.findOneBy({ id: dto.categoryId });
    if (!category) throw new NotFoundException('Category not found');

    const movie = this.movieRepo.create({
      ...dto,
      category,
    });

    return this.movieRepo.save(movie);
  }

 findAll() {
    return this.movieRepo.find({
      relations: ['ratings'],
    });
  }

  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.movieRepo.findOne({
      where: { id },
      relations: ['ratings'],
    });
  }

  async findByTitle(title: string) {
  return this.movieRepo.findOne({ where: { title } });
}


  async update(@Param('id',ParseIntPipe) id: number, dto: UpdateMovieDto) {
    const movie = await this.movieRepo.findOneBy({ id });
    if (!movie) throw new NotFoundException('Movie not found');

    if (dto.categoryId) {
      const category = await this.categoryRepo.findOneBy({ id: dto.categoryId });
      if (!category) throw new NotFoundException('Category not found');
      movie.category = category;
    }

    Object.assign(movie, dto);
    return this.movieRepo.save(movie);
  }

 async remove(@Param('id',ParseIntPipe) id: number) {
    const movie = await this.movieRepo.findOneBy({ id });
    if (!movie) throw new NotFoundException('Movie not found');
    return this.movieRepo.remove(movie);
  }

async searchByTitle(title: string) {

  return this.movieRepo.find({
    where: {
      title: ILike(`%${title}%`), 
    },
    relations: ['category', 'ratings'], 
  });
}

}
