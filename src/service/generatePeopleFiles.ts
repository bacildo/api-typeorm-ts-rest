import { Json2CsvOptions } from "json-2-csv";
import { Service } from "typedi";
import { PeopleRepository } from "../repositories";
import { GeneratorService } from "./generator";

@Service()
export class PeopleGenerateCSVFiles {
  private repository: PeopleRepository;
  private generatorService: GeneratorService;

  constructor() {
    this.repository = new PeopleRepository();
    this.generatorService = new GeneratorService();
  }

  async generatePeopleCSVFiles(): Promise<any> {
    try {
      const peopleData = await this.repository.findAllPeople();

      if (peopleData) {
        const csvOptions: Json2CsvOptions = {
          useLocaleFormat: false,
        };
        return await this.generatorService.generateCsv(peopleData, csvOptions);
      }
    } catch (error) {
      throw new Error(`${error}, File not generated!`);
    }
  }
}
