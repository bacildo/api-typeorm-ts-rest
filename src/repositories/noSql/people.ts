import { Service } from "typedi";
import { PeopleEntity } from "../../entities";
import { Database } from "../../initialization";
import { Abstract } from "../abstract/abstract";

@Service()
export class PeopleRepository extends Abstract<PeopleEntity> {
  constructor() {
    super(Database.mongo, PeopleEntity);
  }
  async findPeople(id: number): Promise<PeopleEntity[]> {
    try {
      const result = this.mongoRepository.find({
        select: ["nome", "idade", "id", "profissao"],
        where: { id: id },
      });

      return result;
    } catch (error) {
      throw new Error();
    }
  }

  async findAllPeople(): Promise<PeopleEntity[]> {
    try {
      const result = await this.mongoRepository.find({
        select: ["nome", "idade", "id", "profissao"],
      });

      return result;
    } catch (error) {
      throw new Error();
    }
  }

  async createPeople(people: PeopleEntity): Promise<PeopleEntity[] | any> {
    try {
      const result = await this.mongoRepository.save(people);
      return result;
    } catch (error) {
      throw new Error();
    }
  }

  async editPeople(
    id: number,
    people: PeopleEntity
  ): Promise<PeopleEntity[] | any> {
    try {
      const result = await this.mongoRepository.update({ id: id }, people);
      return result;
    } catch (error) {
      throw new Error();
    }
  }

  async deletePeople(id: number): Promise<PeopleEntity[] | any> {
    try {
      const result = await this.mongoRepository.delete({ id: id });
      return result;
    } catch (error) {
      throw new Error();
    }
  }
}
