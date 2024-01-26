import { Get, JsonController, Param } from "routing-controllers";
import { Service } from "typedi";
import { CustomerService } from "../service/";

@Service()
@JsonController()
export class CustomerController {
  private customer: CustomerService;

  constructor() {
    this.customer = new CustomerService();
  }

  @Get("/list/:id")
  public async getCustomer(@Param("id") param: number): Promise<any> {
    if (param == null || undefined) {
      throw new Error("Customer not found");
    } else {
      return await this.customer.findCustomerService(param);
    }
  }
}
