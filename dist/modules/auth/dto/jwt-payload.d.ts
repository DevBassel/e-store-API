import { Role } from '../enums/role.enum';
export interface JwtPayload {
    email: string;
    username: string;
    id: number;
    role: Role;
}
