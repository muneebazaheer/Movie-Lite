import { Movie } from "src/movie/entities/movie.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; 

  @OneToMany(() => Movie, movie => movie.category)
  movies: Movie[];

  @ManyToMany(() => User, user => user.preferredCategories)
  users: User[];
}
