import { randomUUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string = randomUUID();

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
