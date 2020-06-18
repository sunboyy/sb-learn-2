export class User {
  id: number;
  username: string;
  enable: 0 | 1;
  authority: 'ROLE_USER' | 'ROLE_ADMIN';
}
