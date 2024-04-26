import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { randomUUID } from "crypto";
import { OsEntity } from "./os.entity";

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

  @OneToMany(() => OsEntity, (entity) => entity.usuario)
  os!: OsEntity[];

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
  }
}
