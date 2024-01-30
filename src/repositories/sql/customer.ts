import { Service } from "typedi";
import { CustomersEntity } from "../../entities";
import { Database } from "../../initialization";
import { Abstract } from "../abstract/abstract";

@Service()
export class CustomerRepository extends Abstract<CustomersEntity> {
  constructor() {
    super(Database.mysql, CustomersEntity);
  }
  async findCustomerData(id: number): Promise<CustomersEntity[] | any> {
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

  async findAllCustomerData(): Promise<CustomersEntity[] | any> {
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
  ): Promise<CustomersEntity[] | any> {
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
  ): Promise<CustomersEntity[] | any> {
    try {
      const result = await this.mySqlRepository.update(
        {
          customerNumber: id,
        },
        {
          customerNumber: customer.customerNumber,
          customerName: customer.customerName,
          contactLastName: customer.contactLastName,
          contactFirstName: customer.contactFirstName,
          phone: customer.phone,
          addressLine1: customer.addressLine1,
          addressLine2: customer.addressLine2,
          city: customer.city,
          state: customer.state,
          postalCode: customer.postalCode,
          country: customer.country,
          salesRepEmployeeNumber: customer.salesRepEmployeeNumber,
          creditLimit: customer.creditLimit,
        }
      );
      if (!result) {
        throw new Error(`Customer not updated.`);
      }
      return result;
    } catch (error) {
      throw `Error to update! ${error}`;
    }
  }

  async deleteCustomer(id: number): Promise<CustomersEntity[] | any> {
    try {
      const result = await this.mySqlRepository.delete({
        customerNumber: id,
      });
      if (!result) {
        throw new Error(`Customer not deleted.`);
      }
      return result;
    } catch (error) {
      throw `Error to delete! ${error}`;
    }
  }
}
