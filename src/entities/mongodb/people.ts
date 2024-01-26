import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("people")
export class PeopleEntity {
  @ObjectIdColumn()
  _id: ObjectID | string;

  @Column()
  nome!: string ;

  @Column()
  idade!: number;

  @Column()
  profissao!: string;



}