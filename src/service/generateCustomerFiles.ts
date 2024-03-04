import { Json2CsvOptions } from "json-2-csv";
import { Service } from "typedi";
import { CustomerRepository } from "../repositories";
import { GeneratorService } from "./generator";

@Service()
export class CustomerGenerateCSVFiles {
  private repository: CustomerRepository;
  private generatorService: GeneratorService;

  constructor() {
    this.repository = new CustomerRepository();
    this.generatorService = new GeneratorService();
  }

  async generateCustomerCSVFiles(): Promise<Object | null> {
    try {
      const customerData = await this.repository.findAllCustomerData();

      if (customerData) {
        const csvOptions: Json2CsvOptions = {
          useLocaleFormat: false,
        };
        return await this.generatorService.generateCsv(customerData, csvOptions);
      }
    } catch (error) {
      throw new Error(`${error}, File not generated!`);
    }
    return null;
  }
}
