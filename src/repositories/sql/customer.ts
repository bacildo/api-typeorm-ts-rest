import { Service } from "typedi";
import { CustomersEntity } from "../../entities";
import { Database } from "../../initialization";
import { Abstract } from "../abstract/abstract";

@Service()
export class CustomerRepository extends Abstract<CustomersEntity> {
  constructor() {
    super(Database.mysql, CustomersEntity);
  }
  findCustomerData(customer: number): Promise<CustomersEntity[] | any> {
    try {
      const result = this.mySqlRepository.find({
        where: {customerNumber:customer}
      })
      if (!result) {
        throw new Error(`Customer with number ${customer} not found.`);
      }
      return result;
    } catch (error) {
      throw `Error to find! ${error}`;
    }
  }
}
