import { Service } from 'typedi';

import { CustomersEntity } from '../../entities'
import { Repository } from 'typeorm';

@Service()
export class CustomerRepository extends Repository<CustomersEntity>{
  
  findCustomerData(customer:number): Promise<any> {  
    try {
     return this.find({
      select:["customerName"] ,
      where: {
         customerNumber:customer
        },
      });
    } catch (error) {
      throw `Error! ${error}`

    }
  }
}