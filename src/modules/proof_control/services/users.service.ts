import { Injectable } from '@nestjs/common';
import { PaginateDto } from 'src/lib/paginate/paginate.type';
import { PaginateResponse } from 'src/lib/paginate/paginate.service';
import { ServiceError } from 'src/lib/error/error.type';
import HRMErrors from 'src/htm.errors';
import {
  UserDtoResponse,
  CreateUserDto,
  UpdateUserDto,
} from '../types/users.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const cleven01 = await this.usersRepository.save(createUserDto);
      return cleven01;
    } catch (error) {
      console.log('Data is not save Users', error);
      throw error;
    }
  }

  async list(
    paginateDto: PaginateDto,
  ): Promise<PaginateResponse<UserDtoResponse>> {
    return await this.usersRepository.list(paginateDto);
  }

  async update(
    id: string,
    payload: UpdateUserDto,
  ): Promise<UserDtoResponse> {
    try {
      const cleven01 = await this.usersRepository.findOne({ where: { id } });
      if (!cleven01) {
        throw new ServiceError(HRMErrors.USER_NOT_EXISTS());
      }
      Object.assign(cleven01, { ...payload });
      const updateCleven01 = await this.usersRepository.save(cleven01);
      return updateCleven01;
    } catch (error) {
      throw new ServiceError(HRMErrors.USER_UPDATE_NOT_EXISTS());
    }
  }

  async delete(id: string): Promise<UserDtoResponse> {
    const cleven01 = await this.usersRepository.findOne({
      where: { id },
    });
    if (!cleven01) {
      throw new ServiceError(HRMErrors.USER_NOT_EXISTS());
    }
    await this.usersRepository.delete({ id });
    return cleven01;
  }
}
