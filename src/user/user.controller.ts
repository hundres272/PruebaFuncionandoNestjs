import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get()
    getAll(@Res() res) {
        this.userService.getAll()
            .then(users => {
                res.status(HttpStatus.OK).json(users);
            })
            .catch(err => {
                res.status(HttpStatus.FORBIDDEN).json(err);
            })
    }
    
    @Get(':id')
    getUser(@Param('id') id:number,@Res() res){
        this.userService.getOne(id)
            .then(user => {
                res.status(HttpStatus.OK).json(user);
            })
            .catch(err => {
                res.status(HttpStatus.FORBIDDEN).json(err);
            })
    }
    
    @Post()
    createUser(@Body() dto: UserDto,@Res() res){
        this.userService.createOne(dto)
            .then(user => {
                    res.status(HttpStatus.CREATED).json(user);
            })
            .catch(err => {
                    res.status(HttpStatus.FORBIDDEN).json(err);
            })
    }
}
