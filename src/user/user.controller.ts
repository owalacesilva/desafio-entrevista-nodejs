import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Request, Res, UseFilters, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { DuplicateEntryFilter } from 'src/exceptions/duplicate.exception.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  index() {
    return this.userService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  show(@Param('id') id: string) {
    return this.userService.getById(+id);
  }

  @Post()
  @UseFilters(DuplicateEntryFilter)
  @UseFilters(new DuplicateEntryFilter())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(new DuplicateEntryFilter())
  update(@Request() request, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(request.user, +id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string, @Res() res) {
    this.userService.delete(+id);

    return res.status(HttpStatus.OK)
        .json({ "message": "User was deleted successfully!" });
  }
}