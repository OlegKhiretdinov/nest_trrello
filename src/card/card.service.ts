import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { createCardDto, updateCardDto } from './dto/createCard.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async userCardsList(user_id: number): Promise<Card[]> {
    return await this.cardRepository.findBy({ user_id });
  }

  async getCardById(id: number, user_id: number): Promise<Card> {
    console.log(id, user_id);
    return await this.cardRepository.findOneBy({ id, user_id });
  }

  async columnsCardList(user_id: number, column_id): Promise<Card[]> {
    return await this.cardRepository.findBy({ user_id, column_id });
  }

  async createCard(data: createCardDto) {
    const edited = new Date().toISOString();
    const newColumn = this.cardRepository.create({ ...data, edited });
    return await this.cardRepository.save(newColumn);
  }

  async updateCard(id: number, user_id: number, data: updateCardDto) {
    const edited = new Date().toISOString();
    return await this.cardRepository.update(
      { id, user_id },
      { ...data, edited },
    );
  }

  async DeleteCard(id: number, user_id: number) {
    return await this.cardRepository.delete({ id, user_id });
  }
}
