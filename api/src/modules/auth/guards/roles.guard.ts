import { Reflector } from '@nestjs/core';
import { USER_ROLE_ENUM } from 'src/modules/users/enums/role.enum';

// this is anthor way to change req metadata
export const Roles = Reflector.createDecorator<USER_ROLE_ENUM>();
