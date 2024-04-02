import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from "./createUser.dto";

// =========== Start Update User DTO ===========
export class UpdateUserDto extends PartialType(CreateUserDto) {}
// =========== End Update User DTO ===========

