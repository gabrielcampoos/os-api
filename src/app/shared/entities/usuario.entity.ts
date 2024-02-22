import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: "usuarios" })
export class UsuariosEntity extends BaseEntity {
  @Column()
  nome!: string;

  @Column()
  username!: string;

  @Column()
  senha!: string;
}
