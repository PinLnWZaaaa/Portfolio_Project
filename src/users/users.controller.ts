import { Controller, Get, Param } from "@nestjs/common";
import { FindUserResponseDto } from "./dto/users.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get('/:userId')
    getUserById(
        @Param('userId') userId: string
    ): FindUserResponseDto {
        return this.userService.getUserById(userId)
    }
}
