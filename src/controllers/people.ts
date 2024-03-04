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
  public async getPerson(
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
  public async createPerson(
    @Body() people: PeopleEntity
  ): Promise<PeopleEntity> {
    if (Object.keys(people).length == 0) {
      throw new Error("Please inform the people data");
    } else {
      return await this.people.createPeopleService(people);
    }
  }
  @Put("/people/:id")
  public async updatePerson(
    @Param("id") id: string,
    @Body() people: PeopleEntity
  ): Promise<PeopleEntity | IPeople> {
    const objectId = new ObjectId(id);
    if (!objectId) {
      throw new Error("Person not found");
    } else {
      return await this.people.editPeopleService(id, people);
    }
  }

  @Delete("/people/:id")
  public async deletePerson(@Param("id") id: number): Promise<PeopleEntity> {
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
