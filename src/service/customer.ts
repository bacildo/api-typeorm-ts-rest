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

  async findCustomerService(customer: number): Promise<CustomersEntity[]> {
    return await this.repository.findCustomerData(customer);
  }
}
