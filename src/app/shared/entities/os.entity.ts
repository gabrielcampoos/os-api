import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
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

  @Column({ name: "criado_por" })
  criadoPor!: string;

  @ManyToOne(() => UsuariosEntity, (entity) => entity.os)
  @JoinColumn({
    name: "criado_por",
    foreignKeyConstraintName: "fk_os_criado_por",
    referencedColumnName: "username",
  })
  usuario!: UsuariosEntity;
}
