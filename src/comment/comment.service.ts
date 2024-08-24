import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { createCommentDto } from './dto/createComment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private cardRepository: Repository<Comment>,
  ) {}

  async userCommentsList(user_id: number): Promise<Comment[]> {
    return await this.cardRepository.findBy({ user_id });
  }

  async getCommentById(id: number, user_id: number): Promise<Comment> {
    console.log(id, user_id);
    return await this.cardRepository.findOneBy({ id, user_id });
  }

  async cardCommentsList(user_id: number, card_id): Promise<Comment[]> {
    return await this.cardRepository.findBy({ user_id, card_id });
  }

  async createComment(data: createCommentDto, user_id) {
    const created_at = new Date().toISOString();
    const newColumn = this.cardRepository.create({
      ...data,
      created_at,
      user_id,
    });
    return await this.cardRepository.save(newColumn);
  }

  async deleteComment(id: number, user_id: number) {
    return await this.cardRepository.delete({ id, user_id });
  }
}
