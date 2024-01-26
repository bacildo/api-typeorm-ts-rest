// import { Inject } from "typedi";
import { Service } from "typedi";
import { PeopleEntity } from "../entities";
import { PeopleRepository } from "../repositories";

@Service()
export class PeopleService {
  private repository: PeopleRepository;

  constructor() {
    this.repository = new PeopleRepository();
  }
  async findPeopleService(name: string): Promise<PeopleEntity[]> {
    return await this.repository.findPeople(name);
  }
}
