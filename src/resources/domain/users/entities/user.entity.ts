import { randomUUID } from "crypto";
import { CreateUserDto } from "../dto/create-user.dto";

export class User {
  id: string;
  name: string;
  email: string;

  constructor(data: CreateUserDto) {
    this.id = randomUUID();
    this.name = data.name;
    this.email = data.email;
  }
}
