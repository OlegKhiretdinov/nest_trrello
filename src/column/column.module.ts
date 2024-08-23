import { Module } from '@nestjs/common';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrelloColumn } from './column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrelloColumn])],
  controllers: [ColumnController],
  providers: [ColumnService],
})
export class ColumnModule {}
