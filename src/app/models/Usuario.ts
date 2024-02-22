import { Base } from "./Base";

export interface UsuarioJSON {
  id: string;
  nome: string;
  username: string;
  criadoEm: Date;
}

export class Usuario extends Base {
  constructor(
    _id: string,
    private _nome: string,
    private _username: string,
    private _senha: string
  ) {
    super();
  }

  public toJSON(): UsuarioJSON {
    return {
      id: this._id,
      nome: this._nome,
      username: this._username,
      criadoEm: this._criadoEm,
    };
  }

  public toJSONComSenha() {
    return {
      id: this._id,
      nome: this._nome,
      username: this._username,
      senha: this._senha,
      criadoEm: this._criadoEm,
    };
  }
}
