/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { listItemsController } from './listItems.controller';
import { ListItemService } from './listItems.service';
import { listItem } from './listItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([listItem])],
  controllers: [listItemsController],
  providers: [ListItemService],
})
export class listItemModule {}
