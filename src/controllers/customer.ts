import { Get, JsonController, Param } from "routing-controllers";
import { CustomerService } from "../service/customer";
// import { Inject } from "typedi";
import { CustomersEntity } from "../entities";
// import { ICustomer } from "../dto";

import { Service } from "typedi";
@Service()
@JsonController()
export class CustomerController {
 
 private customer : CustomerService

constructor () {
  this.customer = new CustomerService()
}

  @Get("/list/:id")
  public async getCustomer(
    @Param("id") param: number
  ): Promise<CustomersEntity> {
   
    if (param == null || undefined) {
      throw new Error("Customer not found");
    }
    const customerData = await this.customer.findCustomerService(param);

    if(!customerData){
      throw new Error("Customer not found")
    } else {
      return customerData;
    }
   
  }
}
