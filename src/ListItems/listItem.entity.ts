/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Todo' })
export class listItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  activity: string;

  @Column({ default: 'open' })
  status: string;

  @Column({ type: 'date', nullable: true })
  CompleteBy: Date;

  @Column({ type: 'date', nullable: true })
  startedDate: Date;

  @Column({ type: 'time', nullable: true })
  startedTime: number;

  @Column({ type: 'date', nullable: true })
  completedDate: Date;
  @Column({ type: 'date', nullable: true })
  completionTime: Date;
}
