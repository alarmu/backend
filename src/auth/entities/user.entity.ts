import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Alarm } from '../../alarms/entities/alarm.entity';

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

  @OneToMany((type) => Alarm, (alarm) => alarm.userId)
  alarms: Alarm[];
}
