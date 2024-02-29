import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { Service } from "typedi";
import { CustomersEntity } from "../entities";
import { ICustomer, JsonCustomer } from "../interfaces";
import { CustomerGenerateCSVFiles, CustomerService } from "../service";

@Service()
@JsonController()
export class CustomerController {
  private customer: CustomerService;
  private customerGenerateCsv: CustomerGenerateCSVFiles;

  constructor() {
    this.customer = new CustomerService();
    this.customerGenerateCsv = new CustomerGenerateCSVFiles();
  }

  @Get("/customer/:id")
  public async getCustomerById(
    @Param("id") id: number
  ): Promise<CustomersEntity[]> {
    if (!id) {
      throw new Error("Customer not found");
    } else {
      return await this.customer.findCustomerService(id);
    }
  }
  @Get("/customer-list")
  public async getAllCustomers(): Promise<CustomersEntity[]> {
    return await this.customer.findAllCustomerService();
  }

  @Post("/customer")
  public async createCustomer(
    @Body() customer: CustomersEntity
  ): Promise<CustomersEntity> {
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
  ): Promise<CustomersEntity> {
    if (!id) {
      throw new Error("Customer not found");
    } else {
      return await this.customer.editCustomerService(id, customer);
    }
  }

  @Delete("/customer/:id")
  public async deleteCustomer(
    @Param("id") id: number
  ): Promise<CustomersEntity> {
    if (!id) {
      throw new Error("Customer not found");
    } else {
      return await this.customer.deleteCustomerService(id);
    }
  }

  @Get("/customer-csv")
  public async getAllCustomerCsv(): Promise<
    { message: string } | { data: ICustomer[] }
  > {
    const customerCsv =
      await this.customerGenerateCsv.generateCustomerCSVFiles();

    if (customerCsv) {
      const customer = await this.customer.findAllCustomerService();

      const jsonCustomerList = customer.map((custom: ICustomer) =>
        JsonCustomer({ customer: custom })
      );

      if (!jsonCustomerList || jsonCustomerList.length === 0) {
        return {
          message:
            "CSV generation completed successfully, but no data was generated.",
        };
      }
      return { data: jsonCustomerList };
    } else {
      return {
        message: "CSV generation failed.",
      };
    }
  }
}
