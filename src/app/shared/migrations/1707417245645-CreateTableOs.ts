import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableOs1707417245645 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "os",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
            default: "uuid_generate_v4()",
          },
          {
            name: "nome_cliente",
            type: "varchar",
            length: "50",
          },
          {
            name: "equipamento",
            type: "varchar",
            length: "50",
          },
          {
            name: "descricao",
            type: "text",
          },
          {
            name: "valor",
            type: "float8",
            isNullable: false,
          },
          {
            name: "criado_por",
            type: "varchar",
            length: "100",
          },
          {
            name: "criado_em",
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ["criado_por"],
            referencedColumnNames: ["username"],
            referencedTableName: "usuarios",
            name: "fk_os_criado_por",
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("os", true, true, true);
  }
}
