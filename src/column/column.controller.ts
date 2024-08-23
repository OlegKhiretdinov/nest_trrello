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
import { ColumnService } from './column.service';
import { OwnerGuard } from 'src/authorization/owner.guard';
import { updateColumnDto } from './dto/createColumn.dto';

@UseGuards(OwnerGuard)
@ApiTags('columns')
@ApiBearerAuth()
@Controller('users/:uid/columns')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  @Get()
  columnList(@Param('uid', ParseIntPipe) uid: number) {
    return this.columnService.userColumnsList(uid);
  }

  @Get(':id')
  columnById(
    @Param('uid', ParseIntPipe) uid: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.columnService.getColumnById(id, uid);
  }

  @Post()
  createColumn(@Body() data: updateColumnDto, @Req() req) {
    const user_id = req.user.sub;
    return this.columnService.createColumn({ ...data, user_id });
  }

  @Put(':id')
  updateColumn(
    @Body() data: updateColumnDto,
    @Param('id', ParseIntPipe) id: number,
    @Param('uid', ParseIntPipe) uid: number,
  ) {
    return this.columnService.updateColumn(id, uid, data);
  }

  @Delete(':id')
  removeColumn(
    @Param('uid', ParseIntPipe) uid: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.columnService.DeleteDateColumn(id, uid);
  }
}
