import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";


@Entity("customers")
export class CustomersEntity {
  @PrimaryGeneratedColumn({ name: "customerNumber" })
  customerNumber: number | undefined;

  @Column({ name: "customerName" })
  customerName: string | undefined;
 
}
