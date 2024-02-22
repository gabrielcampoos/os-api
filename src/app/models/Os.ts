import { Base } from "./Base";

export interface OsJSON {
  id: string;
  nomeCliente: string;
  equipamento: string;
  descricao: string;
  valor: number;
  criadoEm: Date;
}

interface EditarOsDTO {
  equipamento?: string;
  descricao?: string;
  valor?: number;
}

export class Os extends Base {
  private _criadoEm: Date;

  constructor(
    _id: string,
    private _nomeCliente: string,
    private _equipamento: string,
    private _descricao: string,
    private _valor: number
  ) {
    super(_id);
    this._criadoEm = new Date();
  }

  public toJSON(): OsJSON {
    return {
      id: this._id,
      nomeCliente: this._nomeCliente,
      equipamento: this._equipamento,
      descricao: this._descricao,
      valor: this._valor,
      criadoEm: this._criadoEm,
    };
  }

  atualizarOs(novasInfos: EditarOsDTO): boolean {
    if (novasInfos.equipamento) {
      if (novasInfos.equipamento?.length < 0) {
        return false;
      }
      this._equipamento = novasInfos.equipamento;
    }

    if (novasInfos.descricao) {
      if (novasInfos.descricao?.length < 0) {
        return false;
      }
      this._descricao = novasInfos.descricao;
    }

    if (novasInfos.valor) {
      if (novasInfos?.valor < 0) {
        return false;
      }
      this._valor = novasInfos.valor;
    }

    return true;
  }
}
