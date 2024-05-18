/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { listItem } from './listItem.entity';
import { CreateItemDto } from './dtos/create-todo.dto';

@Injectable()
export class ListItemService {
  constructor(
    @InjectRepository(listItem)
    private readonly ListItemRepository: Repository<listItem>,
  ) {}

  async create(dto: CreateItemDto) {
    const item = this.ListItemRepository.create(dto);
    return await this.ListItemRepository.save(item);
  }

  async findMany(page: number = 1, limit: number = 10) {
    const options: FindManyOptions<listItem> = {
      skip: (page - 1) * limit,
      take: limit,
    };
    const [todos, totalCount] =
      await this.ListItemRepository.findAndCount(options);
    const totalPages = Math.ceil(totalCount / limit);
    return { todos, totalCount, totalPages, currentPage: page };
  }

  // const todo =await this.ListItemRepository.find();
  // return todo;

  async findBy(status: string, page: number = 1, limit: number = 10) {
    const options: FindManyOptions<listItem> = {
      where: { status },
      skip: (page - 1) * limit,
      take: limit,
    };
    const [todos, totalCount] =
      await this.ListItemRepository.findAndCount(options);
    const totalPages = Math.ceil(totalCount / limit);
    return { todos, totalCount, totalPages, currentPage: page };
  }

  async delete(id: number) {
    const item = await this.ListItemRepository.findOne({ where: { id } });
    return await this.ListItemRepository.remove(item);
  }

  async findOne(id: number) {
    return await this.ListItemRepository.findOne({ where: { id } });
  }

  async update(dto: CreateItemDto, id: number) {
    // Find the item by id
    const todo = await this.ListItemRepository.findOne({ where: { id } });

    if (todo) {
      // Update the properties
      todo.activity = dto.activity;
      todo.status = dto.status;
      todo.CompleteBy = dto.CompleteBy;
      todo.startedDate = dto.startedDate;
      todo.startedTime = dto.startedTime;
      todo.completedDate = dto.completedDate;
      todo.completedTime = dto.completedTime;

      return await this.ListItemRepository.save(todo);
    } else {
      throw new Error('ListItem not found');
    }
  }

  async getDataByDate(status: string, startDate: Date, endDate: Date) {
    if (status === 'inprogress') {
      return await this.ListItemRepository.createQueryBuilder('listItem')
        .where('23', { endDate })
        .getMany();
    } else if (status === 'completed') {
      return await this.ListItemRepository.createQueryBuilder('listItem')
        .where('listItem.status = :status', { status })
        .andWhere('listItem.startedDate >= :startDate', { startDate })
        .andWhere('listItem.completedDate <= :endDate', { endDate })
        .getMany();
    } else {
      throw new Error('Invalid status provided');
    }
  }
}
