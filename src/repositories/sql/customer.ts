import { Service } from "typedi";
import { CustomersEntity } from "../../entities";
import { Database } from "../../initialization";
import { Abstract } from "../abstract/abstract";

@Service()
export class CustomerRepository extends Abstract<CustomersEntity[]> {
  constructor() {
    super(Database.mysql, CustomerRepository);
  }
  findCustomerData(customer: number): Promise<CustomersEntity[] | any> {
    try {
      const result = this.mySqlRepository.createQueryBuilder()
      .select("customerName")
      .from(CustomersEntity,"customers")
      .where("customerNumber", {id:customer})
      .getOne()
      if (!result) {
        throw new Error(`Customer with number ${customer} not found.`);
      }
      return result;
    } catch (error) {
      throw `Error to find! ${error}`;
    }
  }
}
