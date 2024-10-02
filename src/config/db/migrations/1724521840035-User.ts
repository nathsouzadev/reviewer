import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1724521840035 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar(100)',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar(100)',
            isUnique: true,
            isNullable: false,
          }
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
