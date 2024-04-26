import { randomUUID } from "crypto";
import { BeforeInsert, Column, PrimaryColumn } from "typeorm";

export class BaseEntity {
  @PrimaryColumn()
  public id!: string;

  @Column({ name: "criado_em" })
  public criadoEm!: Date;

  @BeforeInsert()
  public beforeInsert() {
    this.id = randomUUID();
    this.criadoEm = new Date();
  }
}
