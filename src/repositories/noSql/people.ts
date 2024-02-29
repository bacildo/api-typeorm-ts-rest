import { Service } from "typedi";
import { PeopleEntity } from "../../entities";
import { Database } from "../../initialization";
import { Abstract } from "../abstract/abstract";
import { ObjectId } from "mongodb";

@Service()
export class PeopleRepository extends Abstract<PeopleEntity> {
  constructor() {
    super(Database.mongo, PeopleEntity);
  }
  async findPeople(id: ObjectId): Promise<PeopleEntity[]> {
    try {
      const result = await this.mongoRepository.find({
        select: ["nome", "idade", "id", "profissao"],
        where: { _id: id },
      });

      result.map((person) => {
        person._id = person._id.toString();
      });

      return result;
    } catch (error) {
      throw new Error(`${error}, People not found`);
    }
  }

  async findAllPeople(): Promise<PeopleEntity[]> {
    try {
      const result = await this.mongoRepository.find();
      result.map((person) => {
        person._id = person._id.toString();
      });
      return result;
    } catch (error) {
      throw new Error(`${error}, People list not found`);
    }
  }

  async createPeople(people: PeopleEntity): Promise<PeopleEntity> {
    try {
      const result = await this.mongoRepository.save(people);
      return result;
    } catch (error) {
      throw new Error(`${error}, People not created`);
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
      throw new Error(`${error}, People not updated`);
    }
  }

  async deletePeople(id: number): Promise<PeopleEntity[] | any> {
    try {
      const result = await this.mongoRepository.delete({ id: id });
      return result;
    } catch (error) {
      throw new Error(`${error}, People not deleted`);
    }
  }
}
