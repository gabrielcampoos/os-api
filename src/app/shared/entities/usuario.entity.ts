import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import { randomUUID } from "crypto";

@Entity({ name: "usuarios" })
export class UsuariosEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  nome!: string;

  @Column()
  username!: string;

  @Column()
  senha!: string;

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
  }
}
