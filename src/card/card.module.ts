import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { CardController, ColumnCardController } from './card.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CardController, ColumnCardController],
  providers: [CardService],
})
export class CardModule {}
