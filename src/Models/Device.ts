import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm';

import { User } from './User';

const encryptor = require('simple-encryptor')(process.env.ENCRYPT_KEY);

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  public device_id: string;

  @ManyToOne(type => User, user => user.devices)
  public user: User;

  public static newDevice(deviceId: string): Device {
    const device = new Device();
    device.device_id = deviceId;

    return device;
  }

  public get $id(): number {
    return this.id;
  }

  public get $device_id(): string {
    return this.device_id;
  }

  public get $user(): User {
    return this.user;
  }

  public set $device_id(value: string) {
    this.device_id = value;
  }

  public set $user(value: User) {
    this.user = value;
  }
}