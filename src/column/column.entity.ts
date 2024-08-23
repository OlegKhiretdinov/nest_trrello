import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrelloColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'bigint' })
  user_id: number;
}
