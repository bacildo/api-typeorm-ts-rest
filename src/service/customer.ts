import { Service } from 'typedi';

import { CustomersEntity } from '../entities';
import { CustomerRepository } from '../repositories';
import { getConnection } from 'typeorm';

@Service()
export class CustomerService {
  private repository: CustomerRepository;

  constructor() {
    const connection = getConnection("mysql");
    this.repository = new CustomerRepository(CustomersEntity, connection.manager);
  }
  async findCustomer(customer:any): Promise<CustomersEntity | any> {
    return await this.repository.findCustomerData(customer);
  }
}
