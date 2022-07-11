import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsDate, Min } from 'class-validator';
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

  @Column({ nullable: true })
  career_path: string;

  @Column({ nullable: true })
  interest: string;

  @Column({ nullable: true })
  linkedIn: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  twitter: string;

  @OneToMany(() => Skill, (skill) => skill.user)
  skills: Skill[];

  @OneToMany(() => Workshop, (workshop) => workshop.user)
  workshops: Workshop[];

  @OneToMany(() => Experience, (experience) => experience.user)
  experiences: Experience[];

  @Column({ unique: true, nullable: true })
  @IsEmail()
  email: string;

  @Column({
    length: 10,
    unique: true,
    nullable: true,
  })
  phone_no: string;

  @Column({ nullable: true })
  line_ID: string;

  //User's personal info
  @Column({ nullable: true })
  name_th: string;

  @Column({ nullable: true })
  surname_th: string;

  @Column({ nullable: true })
  name_en: string;

  @Column({ nullable: true })
  surname_en: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  @IsDate()
  birthdate: Date;

  @Column({ nullable: true })
  faculty: string;

  @Column({ nullable: true })
  major: string;

  @Column({ length: 10, nullable: true })
  student_ID: string;

  @Column({
    default: 'staff',
    nullable: false,
  })
  position: string;

  @Column({
    default: 0,
    nullable: false,
  })
  @Min(0.0)
  compensation_rate: number;
}
