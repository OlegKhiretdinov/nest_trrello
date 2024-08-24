import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CardService } from './card.service';
import { OwnerGuard } from 'src/authorization/owner.guard';
import { updateCardDto } from './dto/createCard.dto';

@UseGuards(OwnerGuard)
@ApiTags('cards')
@ApiBearerAuth()
@Controller('users/:uid/cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  userCardList(@Param('uid', ParseIntPipe) uid: number) {
    console.log('ddd');
    return this.cardService.userCardsList(uid);
  }

  @Get(':id')
  cardById(
    @Param('uid', ParseIntPipe) uid: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cardService.getCardById(id, uid);
  }

  @Post()
  createCard(@Body() data: updateCardDto, @Req() req) {
    const user_id = req.user.sub;
    return this.cardService.createCard({ ...data, user_id });
  }

  @Put(':id')
  updateCard(
    @Body() data: updateCardDto,
    @Param('id', ParseIntPipe) id: number,
    @Param('uid', ParseIntPipe) uid: number,
  ) {
    return this.cardService.updateCard(id, uid, data);
  }

  @Delete(':id')
  removeCard(
    @Param('uid', ParseIntPipe) uid: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cardService.DeleteCard(id, uid);
  }
}

@UseGuards(OwnerGuard)
@ApiTags('cards')
@ApiBearerAuth()
@Controller('users/:uid/columns/:cid')
export class ColumnCardController {
  constructor(private cardService: CardService) {}

  @Get('cards')
  cardById(
    @Param('uid', ParseIntPipe) uid: number,
    @Param('cid', ParseIntPipe) cid: number,
  ) {
    return this.cardService.columnsCardList(uid, cid);
  }
}
