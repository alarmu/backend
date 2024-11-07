import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum AlarmWeekdays {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'SUNDAY',
}

export type AlarmDays = AlarmWeekdays[] | null;

@Entity()
export class Alarm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('time')
  time: string;

  @Column({
    type: 'simple-array',
    nullable: true,
    default: null,
  })
  days: AlarmDays;

  @Column('varchar', { nullable: true })
  name: string | null = null;

  @Column('boolean', { default: true })
  active: boolean;

  @OneToMany((type) => Alarm, (alarm) => alarm.userId)
  alarms: Alarm[];
}