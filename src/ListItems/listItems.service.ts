/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  async findMany() {
    return await this.ListItemRepository.find();
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
}
