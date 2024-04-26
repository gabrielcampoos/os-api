import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsuarios1707417233141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuarios",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "nome",
            type: "varchar",
            length: "100",
          },
          {
            name: "username",
            type: "varchar",
            length: "50",
            isUnique: true,
          },
          {
            name: "senha",
            type: "varchar",
            length: "255",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usuarios", true, true, true);
  }
}
