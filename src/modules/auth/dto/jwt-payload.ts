import { Role } from '../enums/role.enum';

export interface JwtPayload {
  jti: string;
  email: string;
  username: string;
  id: number;
  role: Role;
}
