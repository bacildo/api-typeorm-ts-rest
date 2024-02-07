import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { Service } from "typedi";
import { PeopleEntity } from "../entities";
import { PeopleGenerateCSVFiles, PeopleService } from "../service";

@Service()
@JsonController()
export class PeopleController {
  private people: PeopleService;
  private peopleGenerateCSVFiles: PeopleGenerateCSVFiles;

  constructor() {
    this.people = new PeopleService();
    this.peopleGenerateCSVFiles = new PeopleGenerateCSVFiles();
  }

  @Get("/people/:id")
  public async getPeople(@Param("id") param: number): Promise<any> {
    if (!param) {
      throw new Error("Customer not found");
    } else {
      return await this.people.findPeopleService(param);
    }
  }

  @Get("/people")
  public async getAllPeople(): Promise<any> {
    return await this.people.findAllPeopleService();
  }

  @Post("/people")
  public async createCustomer(@Body() people: PeopleEntity): Promise<any> {
    if (!people) {
      throw new Error("Please inform the people data");
    } else {
      return await this.people.createPeopleService(people);
    }
  }

  @Put("/people/:id")
  public async updateCustomer(
    @Param("id") id: number,
    @Body() people: PeopleEntity
  ): Promise<any> {
    if (!id) {
      throw new Error("People not found");
    } else {
      return await this.people.editPeopleService(id, people);
    }
  }

  @Delete("/people/:id")
  public async deleteCustomer(@Param("id") id: number): Promise<any> {
    if (!id) {
      throw new Error("Customer not found");
    } else {
      return await this.people.deletePeopleService(id);
    }
  }

  @Get("/people-csv")
  public async getAllPeopleCsv(): Promise<any> {
    const peopleCsv =
      await this.peopleGenerateCSVFiles.generatePeopleCSVFiles();

    if (!peopleCsv) {
      return {
        message:
          "CSV generation completed successfully, but no file was generated.",
      };
    }
    return peopleCsv;
  }
}
