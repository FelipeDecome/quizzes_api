import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Answer from './Answer';
import Quiz from './Quiz';

@Entity()
export default class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @OneToMany(() => Answer, answers => answers.question, { cascade: ['insert'] })
  answers: Answer[];

  @ManyToOne(() => Quiz, quiz => quiz.questions)
  quiz: Quiz;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
