import { Category } from "src/category/entities/category.entity";
import { Rating } from "src/rating/entities/rating.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  image: string; // Store URL or filename

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @ManyToMany(() => Category)
  @JoinTable()
  preferredCategories: Category[];

  @OneToMany(() => Rating, rating => rating.user)
  ratings: Rating[];
}
