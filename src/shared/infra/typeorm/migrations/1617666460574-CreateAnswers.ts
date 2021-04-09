import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAnswers1617666460574 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'answers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'text',
            type: 'varchar',
          },
          {
            name: 'is_correct',
            type: 'boolean',
          },
          {
            name: 'question_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'ANSWERS_QUESTION',
            columnNames: ['question_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'questions',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('answers');
  }
}
