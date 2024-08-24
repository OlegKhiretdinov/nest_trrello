import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'bigint' })
  column_id: number;

  @CreateDateColumn()
  edited: Date;
}
