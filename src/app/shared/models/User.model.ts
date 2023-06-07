export class User {
  id!: string;
  name!: string;
  tenant!: string;
  email!: string;
  token!: string;
  refreshToken!: string;
  expiredOn!: number;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
