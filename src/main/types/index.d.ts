declare namespace Express {
  interface Request {
    usuario: {
      id: string;
      nome: string;
      username: string;
    };
  }
}
