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
import { IPeople, JsonPeople, notFoundPeople } from "../interfaces";
import { PeopleGenerateCSVFiles, PeopleService } from "../service";
import { ObjectId } from "mongodb";

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
  public async getPeople(
    @Param("id") id: string
  ): Promise<PeopleEntity[] | IPeople> {
    const objectId = new ObjectId(id);
    const people = await this.people.findPeopleService(objectId);
    if (!people.length) {
      return notFoundPeople();
    }
    return people;
  }
  @Get("/people")
  public async getAllPeople(): Promise<PeopleEntity[] | IPeople> {
    const people = await this.people.findAllPeopleService();
    if (!people.length) {
      return notFoundPeople();
    }
    return people;
  }
  @Post("/people")
  public async createCustomer(
    @Body() people: PeopleEntity
  ): Promise<PeopleEntity> {   
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
  ): Promise<PeopleEntity> {
    if (!id) {
      throw new Error("People not found");
    } else {
      return await this.people.editPeopleService(id, people);
    }
  }

  @Delete("/people/:id")
  public async deleteCustomer(@Param("id") id: number): Promise<PeopleEntity> {
    if (!id) {
      throw new Error("Customer not found");
    } else {
      return await this.people.deletePeopleService(id);
    }
  }
  @Get("/people-csv")
  public async getAllPeopleCsv(): Promise<
    { message: string } | { data: IPeople[] }
  > {
    const peopleCsv =
      await this.peopleGenerateCSVFiles.generatePeopleCSVFiles();

    if (peopleCsv) {
      const people = await this.people.findAllPeopleService();

      const jsonPeopleList = people.map((person: IPeople) =>
        JsonPeople({ people: person })
      );

      if (!jsonPeopleList || jsonPeopleList.length === 0) {
        return {
          message:
            "CSV generation completed successfully, but no data was generated.",
        };
      }
      return { data: jsonPeopleList };
    } else {
      return {
        message: "CSV generation failed.",
      };
    }
  }
}
