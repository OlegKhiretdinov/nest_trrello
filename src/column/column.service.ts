import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrelloColumn } from './column.entity';
import { createColumnDto, updateColumnDto } from './dto/createColumn.dto';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(TrelloColumn)
    private columnRepository: Repository<TrelloColumn>,
  ) {}

  async userColumnsList(user_id: number): Promise<TrelloColumn[]> {
    return await this.columnRepository.findBy({ user_id });
  }

  async getColumnById(id: number, user_id: number): Promise<TrelloColumn> {
    console.log(id, user_id);
    return await this.columnRepository.findOneBy({ id, user_id });
  }

  async createColumn(data: createColumnDto) {
    const newColumn = this.columnRepository.create(data);
    return await this.columnRepository.save(newColumn);
  }

  async updateColumn(id: number, user_id: number, data: updateColumnDto) {
    return await this.columnRepository.update({ id, user_id }, data);
  }

  async DeleteDateColumn(id: number, user_id: number) {
    return await this.columnRepository.delete({ id, user_id });
  }
}
