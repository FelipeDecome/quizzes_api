import { v4 as uuid } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Question from './Question';

@Entity('quizzes')
export default class Quiz {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  creator_email: string;

  @OneToMany(() => Question, questions => questions.quiz, {
    eager: true,
    cascade: true,
  })
  questions: Question[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
