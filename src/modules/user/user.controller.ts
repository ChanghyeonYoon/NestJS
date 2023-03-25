import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get User List' })
  @ApiResponse({ status: 200, description: 'Success' })
  getAll(@Res() res: Response) {
    const users = this.userService.getAll();
    res.status(HttpStatus.OK).json({ users });
  }

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, description: 'Created' })
  create(@Body() dto: CreateUserDto, @Res() res: Response) {
    const createdUserId = this.userService.create(dto);
    res.status(HttpStatus.CREATED).json({ id: createdUserId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User Detail' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  getOne(@Param('id') id: string, @Res() res: Response) {
    const user = this.userService.getOne(id);
    res.status(HttpStatus.OK).json({ user });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: 204, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Res() res: Response,
  ) {
    this.userService.update(id, dto);
    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: 204, description: 'Deleted' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  deleteOne(@Param('id') id: string, @Res() res: Response) {
    this.userService.deleteOne(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
