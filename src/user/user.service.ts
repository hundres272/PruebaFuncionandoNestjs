import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async getAll(){
        return await this.userRepository.find();
    }

    async getOne(id: number){
        const user = this.userRepository.findOne(id)
        return user;
    }

    async createOne(dto: UserDto){
        const newUser = new UserEntity();
        newUser.email = dto.email;
        newUser.password = dto.password;
        return await this.userRepository.save(newUser);
    }
}
