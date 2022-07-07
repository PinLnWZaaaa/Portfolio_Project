import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['username'])
@Entity()
export class User {
  @PrimaryGeneratedColumn() // primary key
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  career_path: string;

  @Column()
  interest: string;

  @Column()
  linkedIn: string;

  @Column()
  facebook: string;

  @Column()
  instagram: string;

  @Column()
  twitter: string;
}
