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

  //User's personal info
  @Column()
  name_th: string;

  @Column()
  surname_th: string;

  @Column()
  name_en: string;

  @Column()
  surname_en: string;

  @Column()
  nickname: string;

  @Column()
  @IsDate()
  birthdate: Date;

  @Column()
  faculty: string;

  @Column()
  major: string;

  @Column({ length: 10 })
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
