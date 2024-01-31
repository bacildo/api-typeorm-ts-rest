import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  Delete,
} from "routing-controllers";
import { Service } from "typedi";
import { PeopleService } from "../service";
import { PeopleEntity } from "../entities";

@Service()
@JsonController()
export class PeopleController {
  private people: PeopleService;

  constructor() {
    this.people = new PeopleService();
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
}
