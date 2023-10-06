import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EmailRetry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ default: 0 })
  retryCount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
