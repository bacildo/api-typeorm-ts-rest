import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  Delete,
} from "routing-controllers";
import { Service } from "typedi";
import { CustomerService } from "../service/";
import { CustomersEntity } from "../entities";

@Service()
@JsonController()
export class CustomerController {
  private customer: CustomerService;

  constructor() {
    this.customer = new CustomerService();
  }

  @Get("/customer/:id")
  public async getCustomerById(@Param("id") id: number): Promise<any> {
    if (!id) {
      throw new Error("Customer not found");
    } else {
      return await this.customer.findCustomerService(id);
    }
  }
  @Get("/customer-list/")
  public async getAllCustomers(): Promise<any> {
    return await this.customer.findAllCustomerService();
  }

  @Post("/customer")
  public async createCustomer(@Body() customer: CustomersEntity): Promise<any> {
    if (!customer) {
      throw new Error("Please inform the customer data");
    } else {
      return await this.customer.createCustomerService(customer);
    }
  }

  @Put("/customer/:id")
  public async updateCustomer(
    @Param("id") id: number,
    @Body() customer: CustomersEntity
  ): Promise<any> {
    if (!id) {
      throw new Error("Customer not found");
    } else {
      return await this.customer.editCustomerService(id, customer);
    }
  }

  @Delete("/customer/:id")
  public async deleteCustomer(@Param("id") id: number): Promise<any> {
    if (!id) {
      throw new Error("Customer not found");
    } else {
      return await this.customer.deleteCustomerService(id);
    }
  }
}
