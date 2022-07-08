import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Length, IsEmail, IsInt } from 'class-validator';
import { Skill } from './skill.entity';
import { Workshop } from './workshop.entity';
import { Experience } from './experience.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() // primary key
  id: number;

  @Column({ unique: true })
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

  @OneToMany(() => Skill, (skill) => skill.user)
  skills: Skill[];

  @OneToMany(() => Workshop, (workshop) => workshop.user)
  workshops: Workshop[];

  @OneToMany(() => Experience, (experience) => experience.user)
  experiences: Experience[];

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({
    length: 10,
    unique: true,
  })
  phone_no: string;

  @Column()
  line_ID: string;
}
