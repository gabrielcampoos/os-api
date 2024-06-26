import { UsuariosRepository } from "../../../../../src/app/features/usuarios/repository";
import { CriarUsuarioUsecase } from "../../../../../src/app/features/usuarios/usecases";
import { Usuario } from "../../../../../src/app/models";
import { RedisConnection } from "../../../../../src/main/database/ioredis.connection";
import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connection";

describe("Testes para o usecase de cadastrar usuário.", () => {
  jest.mock("../../../../../src/app/features/usuarios/repository");

  function createSut() {
    return new CriarUsuarioUsecase();
  }

  beforeAll(async () => {
    await DatabaseConnection.connect();
    await RedisConnection.connect();
  });

  afterAll(async () => {
    await DatabaseConnection.destroy();
    await RedisConnection.destroy();
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  test("Deve retornar false quando chamar o método execute passando um username que já existe na base de dados.", async () => {
    jest
      .spyOn(
        UsuariosRepository.prototype,
        "verificarSeUsuarioExistePorUsername"
      )
      .mockResolvedValue(null);
  });

  test("Deve cadastrar um usuário quando chamar o método execute passando um username que não existe na base de dados", async () => {
    const usuarioFake = new Usuario(
      "any_id",
      "any_nome",
      "any_username",
      "any_senha"
    );

    jest
      .spyOn(
        UsuariosRepository.prototype,
        "verificarSeUsuarioExistePorUsername"
      )
      .mockResolvedValue(null);

    jest
      .spyOn(UsuariosRepository.prototype, "cadastrar")
      .mockResolvedValue(usuarioFake);

    const sut = createSut();

    const resultado = await sut.execute({
      nome: "any_nome",
      username: "any_username",
      senha: "any_senha",
    });

    expect(resultado).toEqual({
      codigo: 200,
      sucesso: true,
      mensagem: "Usuário criado com sucesso.",
      dados: usuarioFake.toJSON(),
    });
  });
});
