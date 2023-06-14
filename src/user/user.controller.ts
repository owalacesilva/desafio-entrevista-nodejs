import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Request, Res, UseFilters, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { DuplicateEntryFilter } from 'src/exceptions/duplicate.exception.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  index() {
    return this.userService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Show a user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  show(@Param('id') id: string) {
    return this.userService.getById(+id);
  }

  @Post()
  @UseFilters(DuplicateEntryFilter)
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(new DuplicateEntryFilter())
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  update(@Request() request, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(request.user, +id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  delete(@Param('id') id: string, @Res() res) {
    this.userService.delete(+id);

    return res.status(HttpStatus.OK)
        .json({ "message": "User was deleted successfully!" });
  }
}