import { Category } from "src/category/entities/category.entity";
import { Rating } from "src/rating/entities/rating.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Category, category => category.movies)
  category: Category;

  @OneToMany(() => Rating, rating => rating.movie)
  ratings: Rating[];
}
