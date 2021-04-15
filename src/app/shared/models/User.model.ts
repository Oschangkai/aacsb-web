export class User {
  id!: string;
  username!: string;
  email!: string;
  token!: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
