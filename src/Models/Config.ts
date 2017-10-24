import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public data: string;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;
}