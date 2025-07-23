import { Movie } from "src/movie/entities/movie.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.ratings)
  user: User;

  @ManyToOne(() => Movie, movie => movie.ratings)
  movie: Movie;

  @Column({ type: 'int' })
  value: number; 
}
