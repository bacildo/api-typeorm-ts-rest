import { Service } from "typedi";
import { CustomersEntity } from "../../entities";
import { Database } from "../../initialization";
import { Abstract } from "../abstract/abstract";

@Service()
export class CustomerRepository extends Abstract<CustomersEntity> {
  constructor() {
    super(Database.mysql, CustomersEntity);
  }
  async findCustomerData(id: number): Promise<CustomersEntity[]> {
    try {
      const result = await this.mySqlRepository.find({
        where: { customerNumber: id },
      });
      if (!result) {
        throw new Error(`Customer with number ${id} not found.`);
      }
      return result;
    } catch (error) {
      throw `Error to find! ${error}`;
    }
  }

  async findAllCustomerData(): Promise<CustomersEntity[]> {
    try {
      const result = await this.mySqlRepository.find({});
      if (!result) {
        throw new Error(`Customers not found.`);
      }
      return result;
    } catch (error) {
      throw `Error to find! ${error}`;
    }
  }

  async createCustomer(
    customer: CustomersEntity
  ): Promise<CustomersEntity> {
    try {
      const result = await this.mySqlRepository.save(customer);
      if (!result) {
        throw new Error(`Customer not created.`);
      }
      return result;
    } catch (error) {
      throw `Error to create! ${error}`;
    }
  }

  async editCustomer(
    id: number,
    customer: CustomersEntity
  ): Promise<CustomersEntity> {
    try {
      const result = await this.mySqlRepository.update(
        {
          customerNumber: id,
        },
        customer
      );
      if (!result || result.affected === 0) {
        throw new Error(`Customer with id ${id} not found.`);
      }
      const updatedCustomer = new CustomersEntity();
      Object.assign(updatedCustomer, customer);
      return updatedCustomer;
    } catch (error) {
      throw `Customer not update! ${error}`;
    }
  }

  async deleteCustomer(id: number): Promise<string | void> {
    try {
      const result = await this.mySqlRepository.delete({
        customerNumber: id,
      });
      if (result.affected === 0) {
        throw new Error(`Customer with id ${id} not found`);
      }
      return `Customer with id ${id} deleted successfully`;
    } catch (error) {
      throw new Error(`${error}, Customer not deleted`);
    }
  }
}
