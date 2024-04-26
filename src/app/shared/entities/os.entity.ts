import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { UsuariosEntity } from "./usuario.entity";

@Entity({ name: "os" })
export class OsEntity {
  @PrimaryColumn()
  public id!: string;

  @Column({ name: "nome_cliente" })
  public nomeCliente!: string;

  @Column()
  public equipamento!: string;

  @Column()
  public descricao!: string;

  @Column()
  public valor!: number;

  @ManyToOne(() => UsuariosEntity, (entity) => entity.os)
  usuario!: UsuariosEntity;
}
