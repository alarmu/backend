import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;

  @Column('varchar')
  phone: string;

  @Column('varchar', { nullable: true })
  authCode: string | null = null;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  lastAuthAttemptTime: Date | null = null;
}
