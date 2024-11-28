import { SetMetadata } from '@nestjs/common';
import { USER_ROLES } from '../constants/user.constants';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);