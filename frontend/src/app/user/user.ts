export class User {
  id: number;
  username: string;
  enabled: 0 | 1;
  language: string;
  authority: 'ROLE_USER' | 'ROLE_ADMIN';
}
