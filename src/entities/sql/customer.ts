import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("customers")
export class CustomersEntity {
  @PrimaryColumn({ type: "integer" })
  customerNumber!: number;

  @Column({ type: "varchar" })
  customerName!: string;

  @Column({ type: "varchar" })
  contactLastName!: string;

  @Column({ type: "varchar" })
  contactFirstName!: string;

  @Column({ type: "varchar" })
  phone!: string;

  @Column({ type: "varchar" })
  addressLine1!: string;

  @Column({ type: "varchar" })
  addressLine2!: string;

  @Column({ type: "varchar" })
  city!: string;

  @Column({ type: "varchar" })
  state!: string;

  @Column({ type: "varchar" })
  postalCode!: string;

  @Column({ type: "varchar" })
  country!: string;

  @Column({ type: "integer" })
  salesRepEmployeeNumber!: number;

  @Column({ type: "integer" })
  creditLimit!: number;
}
