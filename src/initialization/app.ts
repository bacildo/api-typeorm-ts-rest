import "reflect-metadata";
import { Database, Server } from "./index";

export class App {
  private server = new Server();
  private databaseMysql = new Database();
  private databaseMongo = new Database();

  async appInitialize(): Promise<Server> {
    // Inicia a conexão com o MySQL e o MongoDB
    await this.databaseMysql.connectMysql();
    await this.databaseMongo.connectMongo();

    // Adiciona um atraso antes de iniciar o servidor Express
    setTimeout(() => {
      this.server.init();
      this.server.start();
    }, 1000); // Atraso de 1 segundo (1000 milissegundos)

    return this.server;
  }
}
