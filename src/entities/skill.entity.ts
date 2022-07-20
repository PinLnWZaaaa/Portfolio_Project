import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export type skilllevel = 'basic' | 'intermediate' | 'advance';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: ['basic', 'intermediate', 'advance'],
  })
  level: skilllevel;

  @ManyToOne(() => User, (user) => user.skills, {onDelete: 'CASCADE'})
  user: User;
}
