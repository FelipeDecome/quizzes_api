import { v4 as uuid } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Answer from './Answer';
import Quiz from './Quiz';

@Entity('questions')
export default class Question {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  text: string;

  @OneToMany(() => Answer, answers => answers.question, {
    eager: true,
    cascade: true,
  })
  answers: Answer[];

  @Column('uuid')
  quiz_id: string;

  @ManyToOne(() => Quiz, quiz => quiz.questions)
  @JoinColumn([{ name: 'quiz_id', referencedColumnName: 'id' }])
  quiz: Quiz;

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
