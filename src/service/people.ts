import { Service } from "typedi";
import { PeopleEntity } from "../entities";
import { PeopleRepository } from "../repositories";

@Service()
export class PeopleService {
  private repository: PeopleRepository;

  constructor() {
    this.repository = new PeopleRepository();
  }
  async findPeopleService(id: number): Promise<PeopleEntity[]> {
    return await this.repository.findPeople(id);
  }

  async findAllPeopleService(): Promise<PeopleEntity[]> {
    return await this.repository.findAllPeople();
  }

  async createPeopleService(people: PeopleEntity): Promise<PeopleEntity> {
    return await this.repository.createPeople(people);
  }

  async editPeopleService(id: number, people: PeopleEntity): Promise<PeopleEntity> {
    return await this.repository.editPeople(id, people);
  }

  async deletePeopleService(id: number): Promise<PeopleEntity> {
    return await this.repository.deletePeople(id);
  }
}
