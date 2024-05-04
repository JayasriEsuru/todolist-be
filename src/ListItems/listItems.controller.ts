/* eslint-disable prettier/prettier */
// listItemsController.ts
import { Body, Controller, Param, Post } from '@nestjs/common';
import { ListItemService } from './listItems.service';
import { CreateItemDto } from './dtos/create-todo.dto';

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

  @Post('readAll')
  async findMany() {
    return await this.listItemsService.findMany();
  }
}
