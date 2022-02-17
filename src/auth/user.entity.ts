import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  password: string;

  @Column()
  rating: number;

  @Column()
  profile: string;

  @Column()
  win_num: number;

  @Column()
  lose_num: number;
}
