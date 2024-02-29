export interface ICustomer {
  customerNumber: number;

  customerName: string;

  contactLastName: string;

  contactFirstName: string;

  phone: string;

  addressLine1: string;

  addressLine2: string;

  city: string;

  state: string;

  postalCode: string;

  country: string;

  salesRepEmployeeNumber: number;

  creditLimit: number;
}

export const JsonCustomer = (options: { customer: ICustomer }) => {
  return {
    customerNumber: options.customer.customerNumber,
    customerName: options.customer.customerName,
    contactLastName: options.customer.contactLastName,
    contactFirstName: options.customer.contactFirstName,
    phone: options.customer.phone,
    addressLine1: options.customer.addressLine1,
    addressLine2: options.customer.addressLine2,
    city: options.customer.city,
    state: options.customer.state,
    postalCode: options.customer.postalCode,
    country: options.customer.country,
    salesRepEmployeeNumber: options.customer.salesRepEmployeeNumber,
    creditLimit: options.customer.creditLimit,
  };
};
