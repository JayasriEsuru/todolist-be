/* eslint-disable prettier/prettier */
// listItemsController.ts
import { Body, Controller, Param, Post } from '@nestjs/common';
import { ListItemService } from './listItems.service';
import { CreateItemDto } from './dtos/create-todo.dto';
// import { Request, query } from 'express';

@Controller('listItems')
export class listItemsController {
  constructor(private readonly listItemsService: ListItemService) {}

  @Post('create')
  create(@Body() dto: CreateItemDto) {
    return this.listItemsService.create(dto);
  }

  @Post('delete/:id')
  async delete(@Param('id') id: number) {
    return await this.listItemsService.delete(id);
  }

  @Post('update/:id')
  async update(@Param('id') id: number, @Body() createItemDto: CreateItemDto) {
    return await this.listItemsService.update(createItemDto, id);
  }

  @Post('byDate/:status/:startDate/:endDate')
  async getDataByDate(
    @Param('status') status: string,

    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
  ) {
    return this.listItemsService.getDataByDate(status, startDate, endDate);
  }

  @Post('readAll')
  async findAll(
    @Body('status') status: string,
    @Body('page') page: number = 1,
    @Body('limit') limit: number = 10,
  ) {
    // const status: string = request.query.status as string;

    if (status) {
      return await this.listItemsService.findBy(status, page, limit);
    } else {
      return await this.listItemsService.findMany(page, limit);
    }
  }

  // async findBy(status: string) {
  //   return await this.listItemsService.findBy(status);
  // }

  //   async findMany() {
  //     return await this.listItemsService.findMany();
  //   }
}
