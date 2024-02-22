import { Base } from "./Base";

export interface UsuarioJSON {
  id: string;
  nome: string;
  username: string;
}

export class Usuario extends Base {
  constructor(
    _id: string,
    private _nome: string,
    private _username: string,
    private _senha: string
  ) {
    super(_id);
  }

  public toJSON(): UsuarioJSON {
    return {
      id: this._id,
      nome: this._nome,
      username: this._username,
    };
  }

  public toJSONComSenha() {
    return {
      id: this._id,
      nome: this._nome,
      username: this._username,
      senha: this._senha,
    };
  }
}
