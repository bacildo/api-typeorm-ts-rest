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
      throw new Error(`${error}, Person not found`);
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

  async createPerson(person: PeopleEntity): Promise<PeopleEntity> {
    try {
      const result = await this.mongoRepository.save(person);
      return result;
    } catch (error) {
      throw new Error(`${error}, Person not created`);
    }
  }

  async editPerson(id: string, person: PeopleEntity): Promise<PeopleEntity> {
    try {
      const updatedPerson = await this.mongoRepository.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: person },
        { returnDocument: "after" }
      );

      if (!updatedPerson) {
        throw new Error(`Person with id ${id} not found`);
      }

      return updatedPerson.value;
    } catch (error) {
      throw new Error(`${error}, Person not updated`);
    }
  }

  async deletePeople(id: number): Promise<PeopleEntity[] | any> {
    try {
      const result = await this.mongoRepository.delete({ id: id });
      return result;
    } catch (error) {
      throw new Error(`${error}, Person not deleted`);
    }
  }
}
