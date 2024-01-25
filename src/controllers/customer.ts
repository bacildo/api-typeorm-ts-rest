import { Get, JsonController, Param } from "routing-controllers";
import { Service } from "typedi";
import { CustomerService } from "../service/customer";

@Service()
@JsonController()
export class CustomerController {
  private readonly customerService: CustomerService;

  constructor() {
    this.customerService = new CustomerService();
  }

  @Get("/:customer")
  public async getCustomer(@Param("customer") customer: any): Promise<any> {
    return await this.customerService.findCustomer(customer);
  }
}
