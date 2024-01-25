import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("customers")
export class CustomersEntity {
  @PrimaryColumn({name: "customerNumber"})
  customerNumber: number | undefined;

  @Column({name:"customerName"})
  customerName: string | undefined;

  @Column({name:"contactLastName"})
  contactLastName: string | undefined;

  @Column({name:"contactFirstName"})
  contactFirstName: string | undefined;

  @Column({name:"phone"})
  phone: string | undefined;

  @Column({name:"addressLine1"})
  addressLine1: string | undefined;

  @Column({name:"addressLine2"})
  addressLine2: string | undefined;

  @Column({name:"city"})
  city: string | undefined;

  @Column({name:"state"})
  state: string | undefined;

  @Column({name:"postalCode"})
  postalCode: string | undefined;

  @Column({name:"country"})
  country: string | undefined;

  @Column({name:"salesRepEmployeeNumber"})
  salesRepEmployeeNumber: number | undefined;

  @Column({name:"creditLimit"})
  creditLimit: number | undefined;
}
