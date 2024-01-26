import { Service } from "typedi";
import { PeopleEntity } from "../../entities";
import { Database } from "../../initialization";
import { Abstract } from "../abstract/abstract";

@Service()
export class PeopleRepository extends Abstract<PeopleEntity> {
  constructor() {
    super(Database.mongo, PeopleEntity);
  }
  async findPeople(name: string): Promise<PeopleEntity[]> {
    try {
      const result = this.mongoRepository.aggregate([
        {
          $match: {
            nome: name,
          },
        },
        {
          $project: {
            idade: 1,
            profissao: 1,
          },
        },

        {
          $group: {
            _id: {
              nome: "$nome",
              idade: "$idade",
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ],{allowDiskUse:true}).toArray()

      return result
  //     const people = await result.toArray();
  //     const newPeople:PeopleEntity [] = [];
  //     people.map((painel) => {
  //       if (painel._id) {
  //         if (painel._id.nomeCarga) {
  //           painel._id.nomeCarga = painel._id.nomeCarga 
  //         }
  //         newCargas.push(painel._id);
  //       }
  //     });
  //     return newCargas;
    } catch (error) {
      throw new Error();
    }
  }
}