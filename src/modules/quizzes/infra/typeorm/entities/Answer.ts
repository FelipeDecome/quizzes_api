import { v4 as uuid } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Question from './Question';

@Entity('answers')
export default class Answer {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column('boolean')
  is_correct: boolean;

  @Column('uuid')
  question_id: string;

  @ManyToOne(() => Question, question => question.answers)
  @JoinColumn([{ name: 'question_id', referencedColumnName: 'id' }])
  question: Question;

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
