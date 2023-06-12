import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @HttpCode(200)
  @Get()
  index() {
    return this.userService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  show(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Post()
  create() {
    return this.userService.create({
      full_name: 'Walace Silva',
      email: 'walace@email.com',
      password: '123456',
    });
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return this.userService.update(+id, {
      full_name: 'Walace Silva',
      email: 'walace@email.com',
      password: '123456',
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Res() res) {
    this.userService.delete(+id);

    return res.status(HttpStatus.OK)
        .json({ "message": "User was deleted successfully!" });
  }
}