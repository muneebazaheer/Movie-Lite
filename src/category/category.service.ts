import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  )
  {
  
  }

  async create(dto: CreateCategoryDto){
    const exists = await this.categoryRepo.findOne({ where: { name: dto.name } });
    if (exists) throw new Error('Category already exists');
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }


async findAll(): Promise<Category[]> {
  return this.categoryRepo.find();
}

async findByName(name: string): Promise<Category | null> {
  return this.categoryRepo.findOne({ where: { name } });
}

async findOne(id: number): Promise<Category> {
  const category = await this.categoryRepo.findOne({ where: { id } });
  if (!category) throw new NotFoundException('Category not found');
  return category;
}

async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
  const category = await this.categoryRepo.preload({
    id,
    ...updateCategoryDto,
  });
  if (!category) throw new NotFoundException('Category not found');
  return this.categoryRepo.save(category);
}

async remove(id: number): Promise<void> {
  const result = await this.categoryRepo.delete(id);
  if (result.affected === 0) {
    throw new NotFoundException('Category not found');
  }
}
}
