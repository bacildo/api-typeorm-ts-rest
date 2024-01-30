// import { Inject } from "typedi";
import { Service } from "typedi";
import { CustomersEntity } from "../entities";
import { CustomerRepository } from "../repositories";

@Service()
export class CustomerService {
  private repository: CustomerRepository;

  constructor() {
    this.repository = new CustomerRepository();
  }

  async findCustomerService(id: number): Promise<CustomersEntity[]> {
    return await this.repository.findCustomerData(id);
  }

  async findAllCustomerService(): Promise<CustomersEntity[]> {
    return await this.repository.findAllCustomerData();
  }
  async createCustomerService(
    customer: CustomersEntity
  ): Promise<CustomersEntity> {
    return await this.repository.createCustomer(customer);
  }

  async editCustomerService(
    id: number,
    customer: CustomersEntity
  ): Promise<CustomersEntity> {
    return await this.repository.editCustomer(id, customer);
  }
  async deleteCustomerService(id: number): Promise<CustomersEntity> {
    return await this.repository.deleteCustomer(id);
  }
}
