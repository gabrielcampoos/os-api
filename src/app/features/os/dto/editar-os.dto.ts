export interface EditarOsDTO {
  idOs: string;
  username: string;
  novosDados: {
    equipamento: string;
    descricao: string;
    valor: number;
  };
}

export interface AlterarOsDTO {
  idOs: string;
  equipamento: string;
  descricao: string;
  valor: number;
}
