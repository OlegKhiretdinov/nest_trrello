import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OwnerGuard } from 'src/authorization/owner.guard';
import { CommentService } from './comment.service';
import { createCommentDto } from './dto/createComment.dto';

@UseGuards(OwnerGuard)
@ApiTags('comments')
@ApiBearerAuth()
@Controller('users/:uid/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  userCommentList(@Param('uid', ParseIntPipe) uid: number) {
    return this.commentService.userCommentsList(uid);
  }

  @Get(':id')
  commentById(
    @Param('uid', ParseIntPipe) uid: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.commentService.getCommentById(id, uid);
  }

  @Post()
  createComment(@Body() data: createCommentDto, @Req() req) {
    console.log(req.user);
    const user_id = req.user.sub;
    return this.commentService.createComment(data, user_id);
  }

  @Delete(':id')
  removeComment(
    @Param('uid', ParseIntPipe) uid: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.commentService.deleteComment(id, uid);
  }
}

@UseGuards(OwnerGuard)
@ApiTags('comments')
@ApiBearerAuth()
@Controller('users/:uid/cards/:cid')
export class ColumnCardController {
  constructor(private commentService: CommentService) {}

  @Get('comments')
  commentById(
    @Param('uid', ParseIntPipe) uid: number,
    @Param('cid', ParseIntPipe) cid: number,
  ) {
    return this.commentService.cardCommentsList(uid, cid);
  }
}
