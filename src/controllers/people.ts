import { Get, JsonController, Param } from "routing-controllers";
import { Service } from "typedi";
import { PeopleService } from "../service";

@Service()
@JsonController()
export class PeopleController {
  private people: PeopleService;

  constructor() {
    this.people = new PeopleService();
  }

  @Get("/people/:name")
  public async getPeople(@Param("name") param: string): Promise<any> {
    if (param == null || undefined) {
      throw new Error("Customer not found");
    } else {
      return await this.people.findPeopleService(param);
    }
  }
}
