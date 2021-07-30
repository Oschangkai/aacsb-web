export class User {
  id!: string;
  username!: string;
  email!: string;
  token!: string;
  refreshToken!: string;
  expiredOn!: number;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
